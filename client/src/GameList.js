import React from 'react';

function GameList({ games, filters }) {
  // Apply filters to the list of games
  const filteredGames = applyFilters(games, filters);

  // Render the list of games
  return (
    <ul>
      {filteredGames.map(game => <li key={game.name}>{game.name}</li>)}
    </ul>
  );
}
