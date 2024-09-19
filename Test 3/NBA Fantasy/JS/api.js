const API_url = 'https://nbaserver-q21u.onrender.com/api/filter';
async function getPlayersBySearch(position, points, twoPercent, threePercent) {
    const requestData = {
        position,
        points,
        twoPercent,
        threePercent
    };
    try {
        const response = await fetch(API_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        const players = await response.json();
        const validYears = [2022, 2023, 2024];
        const filteredPlayers = players.filter(player => player.season.some(year => validYears.includes(year)));
        return filteredPlayers;
    }
    catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
}
export { getPlayersBySearch };
