<template>
  <BCard no-body class="card-h-100">
    <BCardHeader>
      <BCardTitle>Próximos vencimentos</BCardTitle>
    </BCardHeader>
    <BCardBody>
      <BRow>
        <BCol md="6">
          <h6 class="text-muted text-uppercase fs-xs mb-3">Contas a pagar</h6>
          <div class="table-responsive">
            <table class="table table-sm table-hover mb-0">
              <tbody>
                <tr v-for="row in pagar" :key="row.id">
                  <td class="text-truncate" style="max-width: 140px" :title="row.descricao">{{ row.descricao }}</td>
                  <td class="text-nowrap text-muted small">{{ formatDate(row.dataVencimento) }}</td>
                  <td class="text-end fw-semibold">{{ formatBrl(row.valor) }}</td>
                </tr>
                <tr v-if="!pagar.length">
                  <td colspan="3" class="text-muted">Nenhum título pendente.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <RouterLink to="/finance/payables" class="btn btn-link btn-sm px-0 mt-2">Ver todas</RouterLink>
        </BCol>
        <BCol md="6" class="mt-4 mt-md-0">
          <h6 class="text-muted text-uppercase fs-xs mb-3">Contas a receber</h6>
          <div class="table-responsive">
            <table class="table table-sm table-hover mb-0">
              <tbody>
                <tr v-for="row in receber" :key="row.id">
                  <td class="text-truncate" style="max-width: 140px" :title="row.descricao">{{ row.descricao }}</td>
                  <td class="text-nowrap text-muted small">{{ formatDate(row.dataVencimento) }}</td>
                  <td class="text-end fw-semibold">{{ formatBrl(row.valor) }}</td>
                </tr>
                <tr v-if="!receber.length">
                  <td colspan="3" class="text-muted">Nenhum título pendente.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <RouterLink to="/finance/receivables" class="btn btn-link btn-sm px-0 mt-2">Ver todas</RouterLink>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
defineProps<{
  pagar: { id: string; descricao: string; valor: number; dataVencimento: string }[]
  receber: { id: string; descricao: string; valor: number; dataVencimento: string }[]
}>()

function formatBrl(v: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}
</script>
