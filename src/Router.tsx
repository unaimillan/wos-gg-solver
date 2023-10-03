import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    action: _ => redirect('/wos-gg-solver/'),
  },
  {
    path: '/wos-gg-solver',
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
