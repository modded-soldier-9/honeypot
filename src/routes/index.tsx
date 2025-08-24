import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
