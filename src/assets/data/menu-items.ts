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
    key: "main",
    label: "",
    isTitle: true,
  },
  {
    key: "teams",
    icon: "iconoir-compact-disc",
    label: "Equipes",
    children: [
      {
        key: "team.index",
        label: "Gerenciar Equipes",
        route: { name: "team.index" },
        parentKey: "teams",
      },
      {
        key: "member.index",
        label: "Gerenciar Membros",
        route: { name: 'member.index' },
        parentKey: "teams",
      },
    ],
  },
  {
    key: "formsx",
    icon: "iconoir-journal-page",
    label: "Envangelismo",
    children: [
      {
        key: "memberxxx.index",
        label: "Lançamento de Fichas",
        route: { name: 'member.index' },
        parentKey: "formsx",
      },
    ],
  },
  {
    key: "project",
    icon: "iconoir-grid-plus",
    label: "Projeto",
    children: [
      {
        key: "church.index",
        label: "Gestão de Igrejas",
        route: { name: 'church.index' },
        parentKey: "project",
      },
    ],
  },
];
