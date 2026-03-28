import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import BudgetPlanning from '../pages/BudgetPlanning';
import Accounts from '../pages/Accounts';
import Goals from '../pages/Goals';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'budget-planning',
        element: <BudgetPlanning />,
      },
      {
        path: 'accounts',
        element: <Accounts />,
      },
      {
        path: 'goals',
        element: <Goals />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);