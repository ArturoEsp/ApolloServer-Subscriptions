import _pubSub from "../libraries/subscription"

const MessageSub = {
    subMessage: {
        subscribe: () => _pubSub.asyncIterator(['MESSAGE_CREATED'])
    }
}

export default MessageSub