import { Review } from "./Review";
export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    averageRating: number;
    isFavorite: boolean;
    genre?: string;
    reviews?: Review[];
  }