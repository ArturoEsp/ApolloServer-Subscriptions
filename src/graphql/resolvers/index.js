import MessageMutation from "./message.mutation"
import MessageSub from "./message.sub"

const resolvers = {
    Mutation: {
        ...MessageMutation
    },
    Subscription: {
        ...MessageSub
    }
}

export default resolvers