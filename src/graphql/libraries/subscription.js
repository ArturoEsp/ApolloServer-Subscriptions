import { PubSub } from "graphql-subscriptions"
import { PubSubEngine } from "graphql-subscriptions"

const { NODE_ENV } = process.env
let _pubSub = null

if (NODE_ENV === 'prod') _pubSub = new PubSubEngine()
else _pubSub = new PubSub()

export default _pubSub