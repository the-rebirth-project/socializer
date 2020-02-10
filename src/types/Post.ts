import { Like } from './Like';
import { Comment } from './Comment';

export type Post = {
  postId: string; // a post id is attached every time we get a post. required for making requests
  body: string;
  userHandle: string;
  createdAt: string;
  userProfile: string;
  comments: Comment[];
  likes: Like[];
  // used for disabling inputs and notifying the user when the comment gets added to the db
  postingComment?: boolean;
  // similar to the above
  addingPost?: boolean;
};
