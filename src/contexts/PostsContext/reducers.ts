import { State } from './context';
import { Action } from './actions';

export const postsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload
      };
    case 'LIKE_POST':
      return {
        ...state,
        // find the required post
        // push the like onto the array of likes
        posts: state.posts.map(p => {
          if (p.postId === action.payload.postId) {
            const likes = p.likes;
            likes.push({ userHandle: action.payload.userHandle });
            return {
              ...p,
              likes
            };
          } else {
            return p;
          }
        })
      };
    case 'UNLIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.postId === action.payload.postId) {
            return {
              ...post,
              likes: post.likes.filter(
                like => like.userHandle !== action.payload.userHandle
              )
            };
          } else {
            return post;
          }
        })
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.postId === action.payload.postId) {
            const comments = post.comments;
            comments.push({
              userHandle: action.payload.userHandle,
              body: action.payload.commentBody,
              createdAt: new Date().toISOString()
            });
            return post;
          }
          return post;
        })
      };
    case 'SET_POSTING_COMMENT':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.postId === action.payload.postId) {
            return {
              ...post,
              postingComment: action.payload.value
            };
          }
          return post;
        })
      };
    default:
      throw new Error(`Unhandled action`);
  }
};
