// src/routes/routesConfig.ts
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import NotFoundPage from "../Pages/NotFoundPage";
import VerificationPage from '../Pages/VerificationPage';

interface RouteItem {
  name: string;
  path: string;
  component: React.FC; 
  protected?: boolean; // example: for auth-protected routes
}

const routesConfig: RouteItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    component: Dashboard,
    protected: true,
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile,
    protected: true,
  },
  {
    name: 'NotFoundPage',
    path: '/404',
    component: NotFoundPage,
    protected:false
  },
    {
    name: 'verify',
    path: '/verify',
    component: VerificationPage,
  },
];

export default routesConfig;
