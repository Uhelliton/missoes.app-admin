import { mockPayables } from '@/modules/finance/services/payable.service'
import { mockReceivables } from '@/modules/finance/services/receivable.service'
import { mockEvents } from '@/modules/events/services/event.service'
import { mockDashboardPeopleItems } from '../mock/dashboard-people.mock'
import type { GenesiisDashboardPayload } from '../types/dashboard.types'
import { buildGenesiisDashboardPayload } from '../utils/aggregates'

/**
 * Dashboard 100% mockado (sem HTTP). Usa os mesmos arrays das telas de financeiro e eventos.
 */
export async function fetchGenesiisDashboard(): Promise<GenesiisDashboardPayload> {
  await new Promise((resolve) => setTimeout(resolve, 450))

  return buildGenesiisDashboardPayload(
    mockPayables,
    mockReceivables,
    mockEvents,
    mockDashboardPeopleItems,
    false,
  )
}
