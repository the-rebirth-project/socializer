import { User } from './User';

export interface UserData extends User {
  bio: string;
  location: string;
  numSubscribers: number; // represents number of followers
  numSeeds: number;
  numPosts: number;
}
