import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LandingPage from '../pages/landingpage/LandingPage';
import DetailsPage from '../pages/detailspage/DetailsPage';
import AuthPage from '../pages/authpage/AuthPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element : <Layout />,
        children : [
            {
                index : true,
                element : <LandingPage />
            }, 
            {
                path : 'games/:gameid',
                element : <DetailsPage />
            },
            {
                path :'auth',
                element : <AuthPage />
            }
        ]
    }
]);