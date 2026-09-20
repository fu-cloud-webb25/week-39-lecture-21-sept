import './gamecard.css';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game }) => {
    const navigate = useNavigate();
    const {
        gameId,
        title,
        releaseYear,
        category,
        developer,
        description,
        platforms
    } = game;

    const visiblePlatforms = platforms.slice(0, 4);
    const remainingPlatforms = platforms.length - visiblePlatforms.length;

    return (
        <article 
            className="game-card"
            onClick={() => navigate(`/games/${gameId}`)}
        >
            <div className="game-card__header">
                <h3 className="game-card__title">{title}</h3>

                <span className="game-card__year">
                    {releaseYear}
                </span>
            </div>

            <p className="game-card__meta">
                {category} · {developer}
            </p>

            <p className="game-card__description">
                {description}
            </p>

            <div className="game-card__platforms">
                {
                    visiblePlatforms.map(platform => (
                        <span
                        className="game-card__platform"
                        key={platform}
                        >
                        {platform}
                        </span>
                    ))
                }

                {
                    remainingPlatforms > 0 && (
                        <span className="game-card__platform">
                        +{remainingPlatforms}
                        </span>
                    )
                }
            </div>
        </article>
    );
};

export default GameCard;