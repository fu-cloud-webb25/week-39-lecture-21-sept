import './reviewcard.css';

const ReviewCard = ({ review, isOwnReview }) => {
    const {
        username,
        rating,
        comment,
        createdAt
    } = review;

    return (
        <article className="review-card">

            <div className="review-card__header">

                <div className="review-card__user">
                    <strong>{username}</strong>

                    <span className="review-card__stars">
                        {'★'.repeat(rating)}
                        {'☆'.repeat(5 - rating)}
                    </span>
                </div>

                <div className="review-card__meta">
                    {isOwnReview && (
                        <button className="review-card__edit">
                            ✎
                        </button>
                    )}
                    <span className="review-card__date">
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <p className="review-card__text">
                {comment}
            </p>

        </article>
    );
};

export default ReviewCard;