import { getModel } from 'base-shared';
import { Conversation } from '../../types/chat';

export const conversation = () =>
  getModel<Conversation>('conversation', {
    firstId: {
      type: String,
    },
    secondId: {
      type: String,
    },
    hiddenFor: [{ type: String }],
  });
