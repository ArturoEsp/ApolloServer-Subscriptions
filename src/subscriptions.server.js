import { SubscriptionServer } from "subscriptions-transport-ws"
import { execute, subscribe } from "graphql"
import { schema } from "./apollo.server"

const subscriptionServer = (WebSocketServer) => {
    return new SubscriptionServer.create(
        {
            schema, execute, subscribe,
            async onConnect(connectionParams, webSocket, context) {
                console.log('Server Subscriptions connect!')
                const token = connectionParams.authorization
            }
        },
        {
            server: WebSocketServer,
            path: '/graphql'
        }
    )
}


export default subscriptionServer