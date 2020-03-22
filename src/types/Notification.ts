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
  message: string;
  createdAt: string;
};
