import type { Payable } from '@/modules/finance/services/payable.service'
import type { Receivable } from '@/modules/finance/services/receivable.service'
import type { Event } from '@/modules/events/services/event.service'
import type {
  FinanceiroResumo,
  MembrosResumo,
  EventosResumo,
  FluxoFinanceiroMensal,
  GenesiisDashboardPayload,
} from '../types/dashboard.types'

const MESES_CURTOS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function monthKeyFromIso(dateStr: string | undefined): string | null {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** Ultimos 12 meses a partir da data de referencia (ano-mes). */
function rollingMonthKeys(ref: Date): string[] {
  const keys: string[] = []
  const y = ref.getFullYear()
  const m = ref.getMonth()
  for (let i = 11; i >= 0; i--) {
    const d = new Date(y, m - i, 1)
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return keys
}

function labelMes(key: string): string {
  const [ys, ms] = key.split('-')
  const mi = Number(ms) - 1
  return `${MESES_CURTOS[mi] ?? ms}/${ys?.slice(2) ?? ''}`
}

export function aggregateFinanceiro(payables: Payable[], receivables: Receivable[]): FinanceiroResumo {
  const abertoPagar = payables.filter((p) => p.status === 'pendente' || p.status === 'atrasado')
  const abertoReceber = receivables.filter((r) => r.status === 'pendente' || r.status === 'atrasado')
  return {
    contasPagarPendentes: payables.filter((p) => p.status === 'pendente').length,
    contasPagarAtrasadas: payables.filter((p) => p.status === 'atrasado').length,
    valorPagarAberto: abertoPagar.reduce((s, p) => s + p.valor, 0),
    contasReceberPendentes: receivables.filter((r) => r.status === 'pendente').length,
    contasReceberAtrasadas: receivables.filter((r) => r.status === 'atrasado').length,
    valorReceberAberto: abertoReceber.reduce((s, r) => s + r.valor, 0),
  }
}

/**
 * Graduados: nível de escolaridade cujo nome contém "superior" e "completo", ou IDs altos como fallback heurístico.
 * TODO: alinhar IDs com o backend quando houver contrato estável na listagem.
 */
export function aggregateMembros(items: unknown[]): MembrosResumo {
  const byGender = new Map<string, number>()
  let graduates = 0

  for (const raw of items) {
    if (!raw || typeof raw !== 'object') continue
    const r = raw as Record<string, unknown>

    let genderLabel = 'Não informado'
    const gObj = r.gender
    if (gObj && typeof gObj === 'object' && 'name' in gObj && typeof (gObj as { name: unknown }).name === 'string') {
      genderLabel = (gObj as { name: string }).name
    } else if (typeof r.genderName === 'string') {
      genderLabel = r.genderName
    } else if (r.genderId === 1) genderLabel = 'Masculino'
    else if (r.genderId === 2) genderLabel = 'Feminino'

    byGender.set(genderLabel, (byGender.get(genderLabel) ?? 0) + 1)

    const levObj = r.levelEducation
    let levName = ''
    if (levObj && typeof levObj === 'object' && 'name' in levObj && typeof (levObj as { name: unknown }).name === 'string') {
      levName = ((levObj as { name: string }).name).toLowerCase()
    }
    const levId = typeof r.levelEducationId === 'number' ? r.levelEducationId : null
    const isGrad =
      (levName.includes('superior') && levName.includes('completo')) ||
      (levName.includes('pós') && levName.includes('graduação')) ||
      (levId !== null && levId >= 5)
    if (isGrad) graduates++
  }

  const porGenero = [...byGender.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)

  return {
    total: items.length,
    porGenero,
    graduados: {
      count: graduates,
      criterio: 'Nível escolar com “superior completo”/pós no nome ou levelEducationId ≥ 5',
    },
  }
}

/** Fallback quando a API de pessoas falha ou retorna vazio. */
export function membrosResumoMock(): MembrosResumo {
  return {
    total: 542,
    porGenero: [
      { label: 'Feminino', count: 312 },
      { label: 'Masculino', count: 215 },
      { label: 'Não informado', count: 15 },
    ],
    graduados: {
      count: 128,
      criterio: 'Dados de demonstração (API indisponível ou sem membros)',
    },
  }
}

export function aggregateEventos(events: Event[], now: Date = new Date()): EventosResumo {
  const y = now.getFullYear()
  const m = now.getMonth()
  const startMes = new Date(y, m, 1).toISOString()
  const endMes = new Date(y, m + 1, 0, 23, 59, 59, 999).toISOString()

  const totalNoMes = events.filter((e) => e.start >= startMes && e.start <= endMes && e.status === 'confirmado').length

  const proximos = events
    .filter((e) => e.start >= now.toISOString() && e.status !== 'cancelado')
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 8)
    .map((e) => ({
      id: e.id,
      titulo: e.title,
      inicio: e.start,
      local: e.location,
      tipo: e.type,
    }))

  return { proximos, totalNoMes }
}

export function aggregateFluxoMensal(
  payables: Payable[],
  receivables: Receivable[],
  ref: Date = new Date(),
): FluxoFinanceiroMensal {
  const keys = rollingMonthKeys(ref)
  const pagarMap = new Map<string, number>()
  const receberMap = new Map<string, number>()

  for (const k of keys) {
    pagarMap.set(k, 0)
    receberMap.set(k, 0)
  }

  for (const p of payables) {
    if (p.status !== 'pago' || !p.dataPagamento) continue
    const k = monthKeyFromIso(p.dataPagamento)
    if (k && pagarMap.has(k)) pagarMap.set(k, (pagarMap.get(k) ?? 0) + p.valor)
  }

  for (const r of receivables) {
    if (r.status !== 'recebido' || !r.dataRecebimento) continue
    const k = monthKeyFromIso(r.dataRecebimento)
    if (k && receberMap.has(k)) receberMap.set(k, (receberMap.get(k) ?? 0) + r.valor)
  }

  return {
    meses: keys.map(labelMes),
    pagarRealizado: keys.map((k) => pagarMap.get(k) ?? 0),
    receberRealizado: keys.map((k) => receberMap.get(k) ?? 0),
  }
}

export function aggregateVencimentos(payables: Payable[], receivables: Receivable[]) {
  const vencimentosPagar = payables
    .filter((p) => p.status === 'pendente' || p.status === 'atrasado')
    .sort((a, b) => a.dataVencimento.localeCompare(b.dataVencimento))
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      descricao: p.descricao,
      valor: p.valor,
      dataVencimento: p.dataVencimento,
    }))

  const vencimentosReceber = receivables
    .filter((r) => r.status === 'pendente' || r.status === 'atrasado')
    .sort((a, b) => a.dataVencimento.localeCompare(b.dataVencimento))
    .slice(0, 6)
    .map((r) => ({
      id: r.id,
      descricao: r.descricao,
      valor: r.valor,
      dataVencimento: r.dataVencimento,
    }))

  return { vencimentosPagar, vencimentosReceber }
}

export function buildGenesiisDashboardPayload(
  payables: Payable[],
  receivables: Receivable[],
  events: Event[],
  peopleItems: unknown[],
  useMembrosMock: boolean,
): GenesiisDashboardPayload {
  const financeiro = aggregateFinanceiro(payables, receivables)
  const membros = useMembrosMock ? membrosResumoMock() : aggregateMembros(peopleItems)
  const eventos = aggregateEventos(events)
  const fluxoMensal = aggregateFluxoMensal(payables, receivables)
  const { vencimentosPagar, vencimentosReceber } = aggregateVencimentos(payables, receivables)

  return {
    financeiro,
    membros,
    eventos,
    fluxoMensal,
    vencimentosPagar,
    vencimentosReceber,
  }
}
