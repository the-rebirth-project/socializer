export type Notification = {
  id: string;
  /**
   * The handle of the user who performed the action
   */
  userHandle: string;
  /**
   * The profile image URL of the user who performed the action
   */
  userProfile: string;
  /**
   * Notification message. Goes right after the username.
   */
  message: string;
  createdAt: string;
};
