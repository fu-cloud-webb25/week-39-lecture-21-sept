import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/loginform/LoginForm';
import RegisterForm from '../../components/registerform/RegisterForm';
import { useAuthStore } from '../../stores/authstore';
import './authpage.css';
import './authforms.css';

const AuthPage = () => {
    const [activeForm, setActiveForm] = useState('login');
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const isLogin = activeForm === 'login';

    if(user) {
        return <Navigate to="/" replace />;
    }
    
    return (
        <div className="wrapper auth-page-wrapper">

            <div className="auth-page__container">

                <header className="auth-page__header">
                    <h1 className="auth-page__title">
                        {isLogin ? 'Sign in' : 'Create account'}
                    </h1>

                    <p className="auth-page__subtitle">
                        {isLogin
                        ? 'Access your GAMEDB account to like and review games.'
                        : 'Register to start reviewing and liking games in the database.'
                        }
                    </p>
                </header>

                <nav className="auth-page__tabs">
                    <button
                        className={`auth-page__tab ${
                        isLogin ? 'auth-page__tab--active' : ''
                        }`}
                        onClick={() => setActiveForm('login')}
                    >
                        Log In
                    </button>

                    <button
                        className={`auth-page__tab ${
                        !isLogin ? 'auth-page__tab--active' : ''
                        }`}
                        onClick={() => setActiveForm('register')}
                    >
                        Register
                    </button>
                </nav>

                {   
                    isLogin
                    ? <LoginForm />
                    : <RegisterForm />
                }

                <button 
                    className="auth-page__browse"
                    onClick={ () => navigate('/') }
                >
                    Browse without signing in →
                </button>

            </div>

        </div>
    );
};

export default AuthPage;