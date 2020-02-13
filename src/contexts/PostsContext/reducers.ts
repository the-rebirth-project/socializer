import { State } from './context';
import { Action } from './actions';

export const postsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload
      };

    case 'SET_REPLIES':
      // maybe a tad inefficient but we'll be restricting number of comments and replies to a max of 500 anyways
      // so I guess time complexity would be constant then
      // we'll also be restricting posts in state to a max of 50

      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.postId === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === action.payload.commentId)
                  return {
                    ...comment,
                    fetchedReplies: true,
                    replies: [...action.payload.replies]
                  };
                return comment;
              })
            };
          }

          return post;
        })
      };

    case 'ADD_POST':
      const posts = state.posts;
      posts.unshift(action.payload);

      return {
        ...state,
        posts: posts
      };

    case 'SET_FETCHING_POSTS':
      return {
        ...state,
        fetchingPosts: action.payload
      };

    case 'SET_ADDING_POST':
      return {
        ...state,
        posts: state.posts.map(p => {
          if (p.postId === action.payload.postId) {
            return {
              ...p,
              addingPost: action.payload.value
            };
          }
          return p;
        })
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
              id: action.payload.commentId,
              userHandle: action.payload.userHandle,
              body: action.payload.commentBody,
              numReplies: 0,
              replies: [],
              localReplies: [],
              showReplies: false,
              postingReply: false,
              fetchedReplies: false,
              createdAt: new Date().toISOString()
            });
            return post;
          }
          return post;
        })
      };

    case 'ADD_REPLY':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.postId === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === action.payload.commentId) {
                  const { replies, localReplies } = comment;
                  const newReply = {
                    id: action.payload.replyId,
                    body: action.payload.body,
                    userHandle: action.payload.userHandle,
                    createdAt: new Date().toISOString()
                  };
                  replies.push(newReply);
                  !comment.showReplies && localReplies.push(newReply);
                  return {
                    ...comment,
                    numReplies: comment.numReplies + 1 // increment number of replies
                  };
                }
                return comment;
              })
            };
          }

          return post;
        })
      };

    case 'RESET_LOCAL_REPLIES':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.postId === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === action.payload.commentId) {
                  return {
                    ...comment,
                    localReplies: []
                  };
                }
                return comment;
              })
            };
          }
          return post;
        })
      };

    case 'SET_SHOW_REPLIES':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.postId === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === action.payload.commentId) {
                  return {
                    ...comment,
                    showReplies: action.payload.value
                  };
                }
                return comment;
              })
            };
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

    case 'SET_POSTING_REPLY':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.postId === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === action.payload.commentId) {
                  return {
                    ...comment,
                    postingReply: action.payload.value
                  };
                }
                return comment;
              })
            };
          }

          return post;
        })
      };

    default:
      throw new Error(`Unhandled action in PostsContext`);
  }
};
