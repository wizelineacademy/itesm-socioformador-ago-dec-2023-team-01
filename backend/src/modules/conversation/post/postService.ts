import conversationRepository from '../conversationRepository';
import { CreatePostInput, Post } from './postModel';
import postRepository from './postRepository';

export const postService = {
  async postToConversation(postInput: CreatePostInput): Promise<Post> {
    const newPost = await postRepository.createPost(postInput);
    await conversationRepository.updateConversation(postInput.conversationId, {
      updatedAt: new Date(),
    });
    return newPost;
  },
};

export default postService;
