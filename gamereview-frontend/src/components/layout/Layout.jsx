import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import './layout.css';

const Layout = () => {
    return (
        <div className="page">
            <Header />
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;