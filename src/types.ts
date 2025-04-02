
export interface User {
  id: string;
  username: string;
  email: string;
  location?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description?: string;
  condition: 'Like New' | 'Very Good' | 'Good' | 'Acceptable' | 'Poor';
  genre?: string;
  year?: number;
  ownerId: string;
  ownerName: string;
  isAvailable: boolean;
}

export interface TradeOffer {
  id: string;
  bookId: string;
  bookTitle: string;
  requesterId: string;
  requesterName: string;
  ownerId: string;
  ownerName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
