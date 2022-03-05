import { ApolloServer } from "apollo-server-express"
import { ApolloLogPlugin } from "apollo-log"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { applyMiddleware } from "graphql-middleware"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { loadFiles } from "graphql-import-files"

import subscriptionServer from "./subscriptions.server"
import resolvers from "./graphql/resolvers"


const { NODE_ENV } = process.env

const plugins = [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    {
        async serverWillStart() {
            return {
                async drainServer() {
                    subscriptionServer().close()
                }
            }
        }
    }
]

export const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs: loadFiles('**/**/schemas/**/*.{gql,graphql}'),
        resolvers
    })
)

const apolloServer = new ApolloServer({
    context: ({ req }) => {
        const token = req.headers.authorization
    },
    introspection: NODE_ENV !== 'prod',
    plugins: plugins,
    schema: schema,
})

export default apolloServer