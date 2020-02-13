import { Reply } from './Reply';

export type Comment = {
  id: string;
  userHandle: string;
  body: string;
  createdAt: string;
  numReplies: number;
  replies: Reply[];
  showReplies: boolean;
  localReplies: Reply[]; // these are replies that are added while fetchedReplies is false
  postingReply: boolean;
  fetchedReplies: boolean;
};
