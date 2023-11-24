import {
  encodingForModel,
  getEncoding,
  type TiktokenModel,
  type TiktokenEncoding,
  Tiktoken,
} from 'js-tiktoken';

export function numTokensFromMessage(message: any, model: string = 'gpt-3.5-turbo-0613'): number {
  let encoding:Tiktoken;
  try {
    encoding = encodingForModel(model as TiktokenModel);
  } catch (error) {
    encoding = getEncoding('cl100k_base' as TiktokenEncoding);
  }
  if (model === 'gpt-3.5-turbo-0613') {
    let tokensOfMessage = 0;
    console.log('calculating for mesage:', message);
    tokensOfMessage += 4; // every message follows <im_start>{role/name}\n{content}<im_end>\n
    tokensOfMessage += (encoding.encode(String(message.content))).length;
    return tokensOfMessage;
  }
  throw new Error(`numTokensFromMessages() is not presently implemented for model ${model}.
      See https://github.com/openai/openai-python/blob/main/chatml.md for information on how messages are converted to tokens.`);
}

export const postToConversation = async (prompt: any, content: any, conversationId: number, tokenCost: number) => {
  try {
    const body = {
      content,
      prompt,
      conversationId,
      tokenCost,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const postId = await response.json();
    return postId;
  } catch (error) {
    console.error(`error posting to a conversation: ${error}`);
    return 0;
  }
};

export const createConversation = async (userId: string, title: string) => {
  try {
    const body = {
      userId,
      languageId: 1,
      title,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const conversationId = await response.json();
    return conversationId;
  } catch (error) {
    console.error(`error posting conversation: ${error}`);
    return 0;
  }
};

export const getConversationFullChat = async (conversationId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations/${conversationId}/full-chat`);
    const conversation = await response.json();
    return conversation;
  } catch (error) {
    console.error(`error getting conversation: ${error}`);
    return {
      conversation: {},
      posts: [],
    };
  }
};

export const editConversationTitle = async (conversationId: number, title: string) => {
  try {
    const body = {
      title,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations/${conversationId}/title`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(`error editing conversation title: ${error}`);
  }
};

export const deleteConversation = async (conversationId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations/${conversationId}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.log(`error deleting conversation: ${error}`);
    return { status: 500 };
  }
};
