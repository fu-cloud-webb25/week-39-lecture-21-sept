import './authbar.css';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authstore';

const AuthBar = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <section className="auth-bar">

            {user && (
                <p className="auth-bar__user">
                    {
                        user.role === 'admin'
                        ? `${user.username} | Admin`
                        : user.username
                    }
                </p>
            )}

            {user ? (
                <Button
                    text="Sign out"
                    onclick={handleLogout}
                />
            ) : (
                <Button
                    text="Sign in"
                    onclick={() => navigate('/auth')}
                />
            )}

        </section>
    );
};

export default AuthBar;