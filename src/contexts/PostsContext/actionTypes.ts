import { Post } from '../../types/Post';
import { Reply } from '../../types/Reply';

export type Action =
  | SetPosts
  | LikePost
  | UnlikePost
  | AddComment
  | SetPostingComment
  | AddPost
  | SetAddingPost
  | SetFetchingPosts
  | SetShowReplies
  | ResetLocalReplies
  | SetReplies
  | AddReply
  | SetPostingReply;

type SetPosts = {
  type: 'SET_POSTS';
  payload: Post[];
};

type LikePost = {
  type: 'LIKE_POST';
  // payload is id of the post
  payload: {
    postId: string;
    userHandle: string;
  };
};

type UnlikePost = {
  type: 'UNLIKE_POST';
  payload: {
    postId: string;
    userHandle: string;
  };
};

type AddComment = {
  type: 'ADD_COMMENT';
  payload: {
    postId: string;
    commentId: string;
    userHandle: string;
    commentBody: string;
  };
};

type SetFetchingPosts = {
  type: 'SET_FETCHING_POSTS';
  payload: boolean;
};

// determines whether or not to show replies on a CommentItem. we can use this to then determine if we should add a reply to the "localReplies" to display it if user didn't click on view replies and added a reply. we reset the localReplies whenever user clicks on View Replies again
type SetShowReplies = {
  type: 'SET_SHOW_REPLIES';
  payload: {
    postId: string;
    commentId: string;
    value: boolean;
  };
};

// resets all of the local replies whenever user clicks on view replies again
type ResetLocalReplies = {
  type: 'RESET_LOCAL_REPLIES';
  payload: {
    postId: string;
    commentId: string;
  };
};

// supply value to be set as payload
type SetPostingComment = {
  type: 'SET_POSTING_COMMENT';
  payload: {
    postId: string;
    value: boolean;
  };
};

type SetPostingReply = {
  type: 'SET_POSTING_REPLY';
  payload: {
    postId: string;
    commentId: string;
    value: boolean;
  };
};

// sets loading state for post being added to db
type SetAddingPost = {
  type: 'SET_ADDING_POST';
  payload: {
    postId: string;
    value: boolean;
  };
};

type AddPost = {
  type: 'ADD_POST';
  payload: Post;
};

type SetReplies = {
  type: 'SET_REPLIES';
  payload: {
    postId: string;
    commentId: string;
    replies: Reply[];
  };
};

type AddReply = {
  type: 'ADD_REPLY';
  payload: {
    replyId: string;
    postId: string;
    commentId: string;
    body: string;
    userHandle: string;
  };
};
