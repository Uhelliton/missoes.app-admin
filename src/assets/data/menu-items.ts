import type { MenuItemType } from "@/types/menu";

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: "main",
    label: "Menu",
    isTitle: true,
  },
  {
    key: "dashboards",
    icon: "iconoir-home-simple",
    label: "Dashboards",
    route: { name: "team.index" },
  },
  {
    key: "teams",
    icon: "iconoir-compact-disc",
    label: "Equipes",
    children: [
      {
        key: "base-ui-alerts",
        label: "Gerenciar Equipes",
        route: { name: "team.index" },
        parentKey: "teams",
      },
      {
        key: "base-ui-avatars",
        label: "Gerenciar Membros",
        route: { name: 'member.index' },
        parentKey: "teams",
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
        route: { name: 'member.index' },
        parentKey: "forms",
      },
    ],
  },
];
