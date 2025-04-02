
import { User, Book, TradeOffer } from "./types";

// Mock users data
export const users: User[] = [
  {
    id: "user1",
    username: "bookworm42",
    email: "bookworm@example.com",
    location: "New York, NY",
    bio: "Avid reader and collector of classic literature",
    avatarUrl: "https://i.pravatar.cc/150?u=user1",
  },
  {
    id: "user2",
    username: "pageturner",
    email: "pageturner@example.com",
    location: "Austin, TX",
    bio: "Science fiction enthusiast and aspiring writer",
    avatarUrl: "https://i.pravatar.cc/150?u=user2",
  },
  {
    id: "user3",
    username: "currentuser",
    email: "currentuser@example.com",
    location: "Boston, MA",
    bio: "Mystery novel addict. Always looking for the next great whodunit.",
    avatarUrl: "https://i.pravatar.cc/150?u=user3",
  },
];

// Mock books data
export const books: Book[] = [
  {
    id: "book1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://source.unsplash.com/random/300x450?book,gatsby",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    condition: "Very Good",
    genre: "Classic",
    year: 1925,
    ownerId: "user1",
    ownerName: "bookworm42",
    isAvailable: true,
  },
  {
    id: "book2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://source.unsplash.com/random/300x450?book,mockingbird",
    description:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
    condition: "Good",
    genre: "Fiction",
    year: 1960,
    ownerId: "user1",
    ownerName: "bookworm42",
    isAvailable: true,
  },
  {
    id: "book3",
    title: "Dune",
    author: "Frank Herbert",
    coverUrl: "https://source.unsplash.com/random/300x450?book,dune,sand",
    description:
      "Dune is a science fiction novel by American author Frank Herbert, originally published in 1965. It is the first installment of the Dune saga.",
    condition: "Like New",
    genre: "Science Fiction",
    year: 1965,
    ownerId: "user2",
    ownerName: "pageturner",
    isAvailable: true,
  },
  {
    id: "book4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "https://source.unsplash.com/random/300x450?book,classic",
    description:
      "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments.",
    condition: "Good",
    genre: "Romance",
    year: 1813,
    ownerId: "user2",
    ownerName: "pageturner",
    isAvailable: true,
  },
  {
    id: "book5",
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://source.unsplash.com/random/300x450?book,dystopia",
    description:
      "1984 is a dystopian social science fiction novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    condition: "Acceptable",
    genre: "Dystopian",
    year: 1949,
    ownerId: "user3",
    ownerName: "currentuser",
    isAvailable: true,
  },
  {
    id: "book6",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverUrl: "https://source.unsplash.com/random/300x450?book,fantasy",
    description:
      "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
    condition: "Very Good",
    genre: "Fantasy",
    year: 1937,
    ownerId: "user3",
    ownerName: "currentuser",
    isAvailable: true,
  },
];

// Mock trade offers
export const tradeOffers: TradeOffer[] = [
  {
    id: "trade1",
    bookId: "book3",
    bookTitle: "Dune",
    requesterId: "user3",
    requesterName: "currentuser",
    ownerId: "user2",
    ownerName: "pageturner",
    status: "pending",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "trade2",
    bookId: "book1",
    bookTitle: "The Great Gatsby",
    requesterId: "user2",
    requesterName: "pageturner",
    ownerId: "user1",
    ownerName: "bookworm42",
    status: "accepted",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

// Current user for simulating login
export const currentUser: User = users.find((user) => user.id === "user3")!;
