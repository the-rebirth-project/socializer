import { Comment } from './Comment';

export type Post = {
  postId: string; // a post id is attached every time we get a post. required for making requests
  body: string;
  userHandle: string;
  userId: string;
  createdAt: string;
  userProfile: string;
  // initially fetched comments
  comments: Comment[];
  numComments: number;
  numSeeds: number;
  isSeeded: boolean;
};
