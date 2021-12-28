import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import routesHome from "./routes.home";
import { Error404 } from "../pages";
import { BasicLayout } from "../layouts";

const routes = [
  ...routesAdmin,
  ...routesClient,
  ...routesHome,
  {
    layout: BasicLayout,
    component: Error404,
  },
];

export default routes;
