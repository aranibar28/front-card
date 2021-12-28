import { HomeLayout } from "../layouts/HomeLayout";
import {
  Home,
  About,
  Categories,
  Products,
  Contact,
  Politics,
  Terms,
  Location,
} from "../pages/Client/Home";

const routesClient = [
  {
    path: "/",
    layout: HomeLayout,
    component: Home,
    exact: true,
  },
  {
    path: "/about",
    layout: HomeLayout,
    component: About,
    exact: true,
  },
  {
    path: "/categories",
    layout: HomeLayout,
    component: Categories,
    exact: true,
  },
  {
    path: "/categories/:idCategory",
    layout: HomeLayout,
    component: Products,
    exact: true,
  },
  {
    path: "/contact",
    layout: HomeLayout,
    component: Contact,
    exact: true,
  },
  {
    path: "/location",
    layout: HomeLayout,
    component: Location,
    exact: true,
  },
  {
    path: "/politics",
    layout: HomeLayout,
    component: Politics,
    exact: true,
  },
  {
    path: "/terms",
    layout: HomeLayout,
    component: Terms,
    exact: true,
  },
];

export default routesClient;
