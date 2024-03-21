import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Pet {
    name: String!
    nickname: String!
    createdUTCDateTime: String!
    profilePictureUrl: String!
  }

  type Post {
    createdUTCDateTime: String!
    mediaUrl: String!
    pet: Pet
    textContent: String!
  }

  type Query {
    test: String!
    posts: [Post!]!
    pets: [Pet!]!
    postsOfPet(nickname: String!): [Post!]!
  }

  type Mutation {
    deletePet(nickname: String!): Boolean
  }
`