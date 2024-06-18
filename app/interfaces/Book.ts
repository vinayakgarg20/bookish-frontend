import { Review } from "./Review";

// interfaces/Book.ts
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