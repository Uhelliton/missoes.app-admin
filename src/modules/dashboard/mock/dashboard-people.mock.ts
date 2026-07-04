/**
 * Pessoas mockadas só para o dashboard (sem chamada à API).
 */
export const mockDashboardPeopleItems: unknown[] = [
  ...Array.from({ length: 218 }, (_, i) => ({
    id: i + 1,
    name: `Membro M ${i + 1}`,
    genderId: 1,
  })),
  ...Array.from({ length: 297 }, (_, i) => ({
    id: 300 + i,
    name: `Membro F ${i + 1}`,
    genderId: 2,
  })),
  ...Array.from({ length: 22 }, (_, i) => ({
    id: 600 + i,
    name: `Sem gênero ${i + 1}`,
  })),
  ...Array.from({ length: 85 }, (_, i) => ({
    id: 700 + i,
    name: `Graduado ${i + 1}`,
    genderId: i % 2 === 0 ? 1 : 2,
    levelEducation: { name: 'Ensino superior completo' },
  })),
  ...Array.from({ length: 40 }, (_, i) => ({
    id: 800 + i,
    name: `Pós ${i + 1}`,
    genderId: 1,
    levelEducation: { name: 'Pós-graduação' },
  })),
]
