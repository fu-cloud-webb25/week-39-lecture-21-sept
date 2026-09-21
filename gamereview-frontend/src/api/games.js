const BASE_URL =
	"https://29fw5ucga9.execute-api.eu-north-1.amazonaws.com/api/games";

export const getGames = async (category, title) => {
	const params = new URLSearchParams();

	if(category !== 'All') {
		params.append('category', category.toLowerCase());
	}

	if(title) {
		params.append('title', title.toLowerCase());
	}

	const queryString = params.toString();

	const url = queryString ?
		`${BASE_URL}?${queryString}` :
		BASE_URL;

	const response = await fetch(url);
	if(!response.ok) {
		throw new Error('Could not fetch games');
	}

	const data = await response.json();

	return data.games;
};

export const getGameById = async gameId => {
	const response = await fetch(`${BASE_URL}/${gameId}`);

	if (!response.ok) {
		throw new Error("Could not fetch game");
	}

	const data = await response.json();

	return data.game;
};

export const addGame = async (game, token) => {
	const response = await fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(game),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Could not add game");
	}

	return data;
};
