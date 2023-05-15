import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import { NextRouter, withRouter } from 'next/router';
import { initEnvironment, fetchQuery } from '../lib/createRelayEnvironment';

interface Props {
  router: NextRouter;
  prepared: {
    boardGameQuery: PreloadedQuery<BoardGameQuery>;
  };
}

const BoardGameQuery = graphql`
  query BoardGameQuery($id: ID!) {
    boardGame(id: $id) {
      _id
      name
      description
      cost
      // ... other properties
    }
  }
`;

const BoardGame: React.FC<Props> = (props) => {
  const data = usePreloadedQuery(BoardGameQuery, props.prepared.boardGameQuery);

  return (
    <div>
      <h1>{data.boardGame.name}</h1>
      <p>{data.boardGame.description}</p>
      <p>Cost: {data.boardGame.cost}</p>
      {/* ... other properties */}
    </div>
  );
};

BoardGame.getInitialProps = async ({ query: { id } }: NextPageContext) => {
  const environment = initEnvironment();
  const boardGameQuery = BoardGameQuery;
  const variables = { id };

  await fetchQuery(environment, boardGameQuery, variables);

  return {
    prepared: {
      boardGameQuery: {
        query: boardGameQuery,
        variables,
      },
    },
  };
};

export default withRouter(BoardGame);
