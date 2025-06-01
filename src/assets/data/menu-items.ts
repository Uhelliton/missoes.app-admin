import type { MenuItemType } from "@/types/menu";

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: "main",
    label: "Main Menu",
    isTitle: true,
  },
  {
    key: "dashboards",
    icon: "iconoir-home-simple",
    label: "Dashboards",
    children: [
      {
        key: "dashboard-analytics",
        label: "Analytics",
        route: { name: "dashboards.analytics" },
        parentKey: "dashboards",
      },
      {
        key: "dashboard-ecommerce",
        label: "Ecommerce",
        route: { name: "dashboards.ecommerce" },
        parentKey: "dashboards",
      },
    ],
  },
  {
    key: "base-ui",
    icon: "iconoir-compact-disc",
    label: "Equipes",
    children: [
      {
        key: "base-ui-alerts",
        label: "Gerenciar Equipes",
        route: { name: "team.index" },
        parentKey: "base-ui",
      },
      {
        key: "base-ui-avatars",
        label: "Gerenciar Membros",
        route: { name: 'member.index' },
        parentKey: "base-ui",
      },
    ],
  },
  {
    key: "forms",
    icon: "iconoir-journal-page",
    label: "Envangelismo",
    children: [
      {
        key: "forms-basic-elements",
        label: "Lançamento de Fichas",
        route: { name: "forms.basic" },
        parentKey: "forms",
      },
    ],
  },
];
