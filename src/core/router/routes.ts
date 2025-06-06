
import { routes as authRoutes } from '@/modules/auth/routes'
import { routes as dashboardRoutes } from '@/modules/dashaboard/routes'
import { routes as teamRoutes } from '@/modules/team/routes'
import { routes as projectRoutes } from '@/modules/project/routes'
import { routes as evangelismRoutes } from '@/modules/evangelism/routes'

const setTitle = (title: string) => {
  return title
    ? `${title} | Genesiis Missões`
    : "Genesiis Missões";
};

const errorRoutes = [
  {
    path: "/auth/error-404",
    name: "error.404",
    meta: {
      title: setTitle("Error 404"),
    },
    component: () => import("@/views/auth/error-404.vue"),
  },
  {
    path: "/auth/error-500",
    name: "error.500",
    meta: {
      title: setTitle("Error 500"),
    },
    component: () => import("@/views/auth/error-500.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/auth/error-404",
  },
];

export const allRoute = [
  ...authRoutes,
  ...teamRoutes,
  ...projectRoutes,
  ...dashboardRoutes,
  ...evangelismRoutes,
  ...errorRoutes,
];
