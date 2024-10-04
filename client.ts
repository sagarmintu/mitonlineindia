import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://cms.mitonlineindia.com/graphql",
  cache: new InMemoryCache(),
});
export default client;
