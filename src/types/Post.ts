export type Post = {
  postId: string; // a post id is attached every time we get a post. required for making requests
  body: string;
  userHandle: string;
  createdAt: string;
  userProfile: string;
};
