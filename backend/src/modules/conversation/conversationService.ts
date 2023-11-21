import conversationRepository from './conversationRepository';
import postRepository from './post/postRepository';

export const conversationService = {
  async getConversationFullChat(conversationId: number) {
    const conversation =
      await conversationRepository.getConversationById(conversationId);

    const messages =
      await postRepository.getPostsOfConversation(conversationId);

    return {
      conversation,
      messages,
    };
  },
};

export default conversationService;
