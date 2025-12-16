import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.escuelajs.co/graphql",
    headers: { "Content-Type": "application/json" }
  }),
  cache: new InMemoryCache(),
});

export default client;
