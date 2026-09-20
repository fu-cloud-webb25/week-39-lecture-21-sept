const BASE_URL =
    'https://29fw5ucga9.execute-api.eu-north-1.amazonaws.com/api';

export const getReviews = async (gameId) => {
    const response = await fetch(
        `${BASE_URL}/games/${gameId}/reviews`
    );

    if (!response.ok) {
        throw new Error('Could not fetch reviews');
    }

    const data = await response.json();

    return data.reviews;
};

export const getReviewsByUser = async (username, token) => {
    const response = await fetch(
        `${BASE_URL}/users/${username}/reviews`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch user reviews');
    }

    return data.reviews;
};

export const createReview = async (gameId, review, token) => {
    const response = await fetch(
        `${BASE_URL}/games/${gameId}/reviews`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(review)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not create review');
    }

    return data;
};