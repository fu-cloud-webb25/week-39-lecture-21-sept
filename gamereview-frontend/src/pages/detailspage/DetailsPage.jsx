import './detailspage.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getGameById } from '../../api/games';
import { getReviews } from '../../api/reviews';
import { useNavigate } from 'react-router-dom';

import LikePanel from '../../components/likepanel/LikePanel';
import Reviews from '../../components/reviews/Reviews';

const DetailsPage = () => {
    const { gameid } = useParams();
    const navigate = useNavigate();

    const {
        data: game,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['game', gameid],
        queryFn: () => getGameById(gameid)
    });

    const {
        data: reviews = [],
        isLoading: isLoadingReviews,
        isError: isReviewsError
    } = useQuery({
        queryKey: ['reviews', gameid],
        queryFn: () => getReviews(gameid),
        enabled: !!gameid
    });
    
    if (!game) {
        return null;
    }

    const {
        gameId,
        title,
        releaseYear,
        category,
        developer,
        publisher,
        platforms,
        description
    } = game;


    const averageRating = reviews.length
        ? (
            reviews.reduce((sum, review) => sum + review.rating, 0)
            / reviews.length
            ).toFixed(1)
        : '0.0';

    return (
        <div className="wrapper details-page">

            <button 
                className="details-page__back"
                onClick={ () => navigate(-1) }
            >
                ‹ Back to search
            </button>

            {isLoading && <p>Loading game...</p>}

            {isError && <p>{error.message}</p>}

            {game && <div className="details-page__layout">

                <main className="details-page__content">

                    <header className="details-page__game-header">
                        <div className="details-page__title-row">
                            <h1 className="details-page__title">
                                {title}
                            </h1>

                            <span className="details-page__year">
                                {releaseYear}
                            </span>
                        </div>

                        <p className="details-page__category">
                            {category}
                        </p>
                    </header>

                    <p className="details-page__description">
                        {description}
                    </p>

                    <section className="details-page__info">
                        <div className="details-page__info-row">
                            <span className="details-page__label">
                                Developer
                            </span>

                            <span>{developer}</span>
                        </div>

                        <div className="details-page__info-row">
                            <span className="details-page__label">
                                Publisher
                            </span>

                            <span>{publisher}</span>
                        </div>

                        <div className="details-page__info-row">
                            <span className="details-page__label">
                                Platforms
                            </span>

                            <div className="details-page__platforms">
                                {platforms.map(platform => (
                                    <span
                                        className="details-page__platform"
                                        key={platform}
                                    >
                                        {platform}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="details-page__info-row">
                            <span className="details-page__label">
                                Game ID
                            </span>

                            <span className="details-page__game-id">
                                {gameId}
                            </span>
                        </div>
                    </section>

                    <Reviews
                        gameId={ gameId }
                        reviews={ reviews }
                        averageRating={ averageRating }
                        isLoading={ isLoadingReviews }
                        isError={ isReviewsError }
                    />

                </main>

                <aside className="details-page__sidebar">

                    <LikePanel gameId={ gameId } />

                    <div className="details-page__stat">
                        <span className="details-page__stat-label">
                            Reviews
                        </span>

                        <strong>
                            {reviews.length}
                        </strong>
                    </div>

                    <div className="details-page__stat">
                        <span className="details-page__stat-label">
                            Avg rating
                        </span>

                        <strong className="details-page__rating">
                            {averageRating}
                        </strong>
                    </div>

                </aside>

            </div>}
        </div>
    );
};

export default DetailsPage;