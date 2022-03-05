import * as dotenv from 'dotenv'
dotenv.config()

import http from 'http'
import express from 'express'

import subscriptionServer from './subscriptions.server'
import apolloServer from './apollo.server'

(async () => {

    const { PORT, NODE_ENV } = process.env

    const app = express()
    await apolloServer.start()
    apolloServer.applyMiddleware({app})

    if (NODE_ENV === 'dev') {
        const httpServer = http.createServer(app)
        httpServer.listen(PORT, () => {
            subscriptionServer(httpServer)
            console.log(`Server listen http on port ${PORT}${apolloServer.graphqlPath}`)
        })
    }

})()
