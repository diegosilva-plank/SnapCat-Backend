import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { db } from "./database/Database"
import { config } from "./config"

const server = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello, world!',
    },
  },
})

const run = async () => {
  await db.setup()
  const { url } = await startStandaloneServer(server, { listen: { port: config.PORT } })
  console.log(`🚀 Server ready at ${url}`)
}

run().catch((err) => console.error(err))