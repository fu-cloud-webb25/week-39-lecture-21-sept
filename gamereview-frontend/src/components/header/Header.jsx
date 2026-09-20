import AuthBar from '../authbar/AuthBar';
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="wrapper header__wrapper">
                <h1>GameReview</h1>
                <AuthBar />
            </div>
        </header>
    )
}

export default Header;