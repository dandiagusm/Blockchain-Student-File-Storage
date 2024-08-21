import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const StudentsPage = lazy(() => import('src/pages/students'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const StudentDetailPage = lazy(() => import('src/pages/student-detail'));

// ----------------------------------------------------------------------

export default function Router(props) {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout >
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage props= {props} />, index: true },
        { path: 'students', element: <StudentsPage props = {props} /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'student-detail', element: <StudentDetailPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
