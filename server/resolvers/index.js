const root = {
    getGame: async ({ _key }) => {
      const cursor = await db.query(aql`
        FOR game IN Games
        FILTER game._key == ${_key}
        RETURN game
      `);
      return cursor.next();
    },
    getAllGames: async () => {
      const cursor = await db.query(aql`
        FOR game IN Games
        RETURN game
      `);
      return cursor.all();
    },
    //...other resolvers
  };
  