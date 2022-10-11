import { GraphQLClient } from "graphql-request";
import { DEFAULT_TOKEN } from "./token";

const gqlClient = new GraphQLClient("https://smart-meeting.herokuapp.com", {
  headers: {
    token: DEFAULT_TOKEN
  }
});
export default function useGraphQL(query, variables = false) {
  return gqlClient.request(query, variables);
}
