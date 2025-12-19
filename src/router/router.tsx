import { lazy } from "react";

import { createHashRouter, Navigate } from "react-router";
import ShopLayout from "../shop/layouts/ShopLayout";
import HomePage from "../shop/pages/HomePage";
import ProductPage from "../shop/pages/ProductPage";
import GenderPage from "../shop/pages/GenderPage";
import LoginPage from "../auth/pages/login/LoginPage";
import RegisterPage from "../auth/pages/register/RegisterPage";
import DashboardPage from "../admin/pages/dashboard/DashboardPage";
import AdminProductsPage from "../admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "../admin/pages/product/AdminProductPage";
import AdminAjustes from "@/admin/pages/ajustes/AdminAjustes";
import AdminAyuda from "@/admin/pages/ayuda/AdminAyuda";
import AdminNotificaciones from "@/admin/pages/notificaciones/AdminNotificaciones";
import AdminOrdenes from "@/admin/pages/ordenes/AdminOrdenes";
import AdminReportes from "@/admin/pages/reportes/AdminReportes";
import AdminUsers from "@/admin/pages/usuarios/AdminUsers";
import { IsAdminRoute, NotAuthenticatedRoute } from "./routes/ProtectedRoutes";

const AuthLayout = lazy(() => import("../auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("../admin/layouts/AdminLayout"));

const appRouter = createHashRouter([
  // Public Routes
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:idSlug",
        element: <ProductPage />,
      },
      {
        path: "gender/:gender",
        element: <GenderPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: (
      <IsAdminRoute>
        <AdminLayout />
      </IsAdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductPage />,
      },
      {
        path: "ajustes",
        element: <AdminAjustes />,
      },
      {
        path: "ayuda",
        element: <AdminAyuda />,
      },
      {
        path: "notificaciones",
        element: <AdminNotificaciones />,
      },
      {
        path: "ordenes",
        element: <AdminOrdenes />,
      },
      {
        path: "reportes",
        element: <AdminReportes />,
      },
      {
        path: "usuarios",
        element: <AdminUsers />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default appRouter;
