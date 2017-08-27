import { 
  Environment, 
  Network, 
  RecordSource, 
  Store,
} from 'relay-runtime';

// Network layer
const fetchQuery = (
  operation, 
  variables,
  // cacheConfig,
  // uploadables,
) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(
    response => response.json()
  );
};

// Relay environment
const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;