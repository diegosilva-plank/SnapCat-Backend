import { db } from "./database/Database"
import { config } from "./config"
import { startStandaloneServer } from '@apollo/server/standalone'
import { apolloServer } from "./graphql"
import { app } from "./app"

const run = async () => {
  await db.setup()
  const { url } = await startStandaloneServer(apolloServer, { listen: { port: config.PORT } })
  console.log(`🚀 GraphQL Server ready at ${url}`)
  app.listen(config.PORT+1, () => {
    console.log(`REST Server is running on port ${config.PORT+1}`)
  })
}

run().catch((err) => console.error(err))