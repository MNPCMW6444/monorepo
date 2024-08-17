import { Router } from 'express';
import { highOrderHandler } from '@base-backend';
import { TODO, UnauthorizedError } from '@base-shared';
import {
  conversation,
  getLastMessageOfConversation,
  getNameOfUser,
  getNumberOfUnreadMessagesInConversation,
} from '@chat-backend';
import { AuthenticatedRequest, User } from '@auth-backend';

export const generateConversationRouter = <UserType>(
  side1Name: string,
  side2Name: string,
) => {
  const conversationRouter = Router();

  conversationRouter.get(
    '/:quantity?',
    highOrderHandler(async (req: AuthenticatedRequest<UserType>) => {
      if (!(req.user as User)) throw new UnauthorizedError('not logged in');
      let quantity: number | undefined = parseInt(req.params['quantity']);
      if (isNaN(quantity) || quantity < 1) {
        quantity = undefined;
      }
      let query = conversation(side1Name, side2Name).find({
        $or: [
          { hostId: String(req.user?._id) },
          { guestId: String(req.user?._id) },
        ],
      });
      if (quantity) {
        query = query.limit(quantity);
      }
      const conversations = await query;

      return {
        statusCode: 200,
        body: await Promise.all(
          conversations.map(async (c: TODO) => ({
            ...c.toObject(),
            lastMessage: await getLastMessageOfConversation(c._id.toString()),
            name: await getNameOfUser(
              (req.user as TODO).userType === 'guest' ? c.hostId : c.guestId,
            ),
            unReadNumber: await getNumberOfUnreadMessagesInConversation(
              c._id.toString(),
              req.user as User,
            ),
          })),
        ),
      };
    }) as TODO,
  );

  return conversationRouter;
};
