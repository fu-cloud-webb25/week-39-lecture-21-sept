import { useState } from 'react'
;import ReviewCard from '../reviewcard/ReviewCard';
import ReviewForm from '../reviewform/ReviewForm';
import Button from '../button/Button';
import { useAuthStore } from '../../stores/authstore';
import { useQuery } from '@tanstack/react-query';
import { getReviewsByUser } from '../../api/reviews';

import './reviews.css';

const Reviews = ({
    gameId,
    reviews,
    averageRating
}) => {
    const [showForm, setShowForm] = useState(false);
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);

    const {
        data: userReviews = []
    } = useQuery({
        queryKey: ['userReviews', user?.username],
        queryFn: () => getReviewsByUser(user.username, token),
        enabled: !!user
    });

    const myReview = userReviews.find(
        (review) => review.gameId === gameId
    );

    return (
        <section className="reviews">

            <div className="reviews__header">

                <h2 className="reviews__title">
                    Reviews ({reviews.length})
                </h2>

                {user && !myReview && !showForm && (
                    <Button
                        text="Review Game"
                        onclick={() => setShowForm(true)}
                    />
                )}

                <div className="reviews__average">
                    <span className="reviews__stars">
                        ★★★★★
                    </span>

                    <span>
                        {averageRating} avg
                    </span>
                </div>


            </div>

            {showForm ? (
                <ReviewForm
                    gameId={ gameId }
                    onCancel={() => setShowForm(false)}
                />
            ) : (
                <div className="reviews__list">
                    {reviews.length === 0 && (
                        <p className="reviews__empty">
                            No reviews yet.
                        </p>
                    )}

                    {reviews.map(review => (
                        <ReviewCard
                            key={review.reviewId}
                            review={review}
                            isOwnReview={review.reviewId === myReview?.reviewId}
                        />
                    ))}
                </div>
            )}

        </section>
    );
};

export default Reviews;