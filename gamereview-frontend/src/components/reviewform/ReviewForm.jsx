import './reviewform.css';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authstore';
import { createReview } from '../../api/reviews';

const ReviewForm = ({ gameId, onCancel }) => {
    const [rating, setRating] = useState(1);
    const [hoverRating, setHoverRating] = useState(0);
    const textRef = useRef();
    const token = useAuthStore((state) => state.token);
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (review) => createReview(gameId, review, token),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['reviews', gameId]
            });

            onCancel();
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const review = {
            rating,
            comment: textRef.current.value
        };
        console.log(review);

        createMutation.mutate(review);
    };

    return (
        <div className="review-form">
            <h3 className="review-form__title">
                Write a review
            </h3>

            <form 
                className="review-form__form"
                onSubmit={ handleSubmit }
            >

                <div className="review-form__group">
                    <label className="review-form__label">
                        Rating
                    </label>

                    <div
                        className="review-form__rating"
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                            >
                                {star <= (hoverRating || rating) ? '★' : '☆'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="review-form__group">
                    <label
                        className="review-form__label"
                        htmlFor="review"
                    >
                        Review
                    </label>

                    <textarea
                        id="review"
                        className="review-form__textarea"
                        placeholder="What did you think about the game?"
                        rows="5"
                        ref={ textRef }
                    />
                </div>

                <div className="review-form__actions">
                    <button
                        type="button"
                        className="review-form__cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="review-form__submit"
                    >
                        Submit Review
                    </button>
                </div>

            </form>

        </div>
    );
};

export default ReviewForm;