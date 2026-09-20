const BASE_URL =
  'https://29fw5ucga9.execute-api.eu-north-1.amazonaws.com/api';

export const getLikes = async (gameId) => {
    const response = await fetch(
        `${BASE_URL}/games/${gameId}/likes`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch likes');
    }

    return data.likes;
};

export const getLikedGames = async (username, token) => {
    const response = await fetch(
        `${BASE_URL}/users/${username}/liked-games`,
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch liked games');
    }

    return data.games;
};

export const likeGame = async (gameId, token) => {
    const response = await fetch(
        `${BASE_URL}/games/${gameId}/likes`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not like game');
    }

    return data;
};

export const unlikeGame = async (gameId, token) => {
    const response = await fetch(
        `${BASE_URL}/games/${gameId}/likes`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        throw new Error(data.message || 'Could not remove like');
    }

    return data;
};