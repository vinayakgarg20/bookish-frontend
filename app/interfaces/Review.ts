export interface Review {
  _id: string;
  userId: string;
  username:string;
  rating: number;
  createdAt: string;
  comment: string;
  isAuthorizedUser: boolean;
}
