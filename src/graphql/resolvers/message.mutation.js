import _pubSub from '../libraries/subscription'

const MessageMutation = {
    sendMessage: (_, { message }) => {
        _pubSub.publish('MESSAGE_CREATED', { subMessage: message })
        return message
    }
}

export default MessageMutation