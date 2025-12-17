import { InMemoryCache, makeVar } from "@apollo/client";

export const searchVar = makeVar<string | null>(null);
export const searchCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read() {
            return searchVar();
          },
        },
      },
    },
  },
});

