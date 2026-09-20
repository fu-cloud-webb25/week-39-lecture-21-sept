import './button.css';

const Button = ({ text, onclick }) => {
    return (
        <button
            onClick={ onclick } 
            className="button"
        >
            { text }
        </button>
    )
}

export default Button;