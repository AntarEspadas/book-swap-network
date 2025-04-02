
import React, { createContext, useState, useContext, useEffect } from "react";
import { Book, TradeOffer } from "../types";
import { books as mockBooks, tradeOffers as mockTradeOffers } from "../mockData";
import { useUser } from "./UserContext";
import { toast } from "sonner";

interface BookContextType {
  books: Book[];
  userBooks: Book[];
  availableBooks: Book[];
  tradeOffers: TradeOffer[];
  isLoading: boolean;
  addBook: (book: Omit<Book, "id" | "ownerId" | "ownerName" | "isAvailable">) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  sendTradeOffer: (bookId: string) => void;
  respondToTradeOffer: (tradeId: string, accept: boolean) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [tradeOffers, setTradeOffers] = useState<TradeOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUser();

  useEffect(() => {
    // Load books and trade offers from localStorage or use mock data
    const loadData = () => {
      try {
        const savedBooks = localStorage.getItem("books");
        const savedTradeOffers = localStorage.getItem("tradeOffers");
        
        setBooks(savedBooks ? JSON.parse(savedBooks) : mockBooks);
        setTradeOffers(savedTradeOffers ? JSON.parse(savedTradeOffers) : mockTradeOffers);
      } catch (error) {
        console.error("Error loading data:", error);
        setBooks(mockBooks);
        setTradeOffers(mockTradeOffers);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("books", JSON.stringify(books));
      localStorage.setItem("tradeOffers", JSON.stringify(tradeOffers));
    }
  }, [books, tradeOffers, isLoading]);

  // Filter books owned by current user
  const userBooks = currentUser
    ? books.filter((book) => book.ownerId === currentUser.id)
    : [];

  // Filter books not owned by current user and still available
  const availableBooks = currentUser
    ? books.filter(
        (book) => book.ownerId !== currentUser.id && book.isAvailable
      )
    : [];

  const addBook = (
    bookData: Omit<Book, "id" | "ownerId" | "ownerName" | "isAvailable">
  ) => {
    if (!currentUser) {
      toast.error("You must be logged in to add books");
      return;
    }

    const newBook: Book = {
      ...bookData,
      id: `book${Date.now()}`,
      ownerId: currentUser.id,
      ownerName: currentUser.username,
      isAvailable: true,
    };

    setBooks((prevBooks) => [...prevBooks, newBook]);
    toast.success("Book added to your collection");
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updates } : book
      )
    );
    toast.success("Book updated successfully");
  };

  const deleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    
    // Also remove any trade offers for this book
    setTradeOffers((prevOffers) => 
      prevOffers.filter((offer) => offer.bookId !== id)
    );
    
    toast.success("Book removed from your collection");
  };

  const sendTradeOffer = (bookId: string) => {
    if (!currentUser) {
      toast.error("You must be logged in to request a trade");
      return;
    }

    const book = books.find((b) => b.id === bookId);
    if (!book) {
      toast.error("Book not found");
      return;
    }

    // Check if user already requested this book
    const existingOffer = tradeOffers.find(
      (offer) =>
        offer.bookId === bookId &&
        offer.requesterId === currentUser.id &&
        offer.status === "pending"
    );

    if (existingOffer) {
      toast.error("You already requested this book");
      return;
    }

    const newTradeOffer: TradeOffer = {
      id: `trade${Date.now()}`,
      bookId,
      bookTitle: book.title,
      requesterId: currentUser.id,
      requesterName: currentUser.username,
      ownerId: book.ownerId,
      ownerName: book.ownerName,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setTradeOffers((prevOffers) => [...prevOffers, newTradeOffer]);
    toast.success("Trade request sent");
  };

  const respondToTradeOffer = (tradeId: string, accept: boolean) => {
    setTradeOffers((prevOffers) =>
      prevOffers.map((offer) => {
        if (offer.id === tradeId) {
          return {
            ...offer,
            status: accept ? "accepted" : "rejected",
          };
        }
        return offer;
      })
    );

    // If accepted, mark the book as unavailable
    if (accept) {
      const offer = tradeOffers.find((o) => o.id === tradeId);
      if (offer) {
        setBooks((prevBooks) =>
          prevBooks.map((book) => {
            if (book.id === offer.bookId) {
              return { ...book, isAvailable: false };
            }
            return book;
          })
        );
      }
      toast.success("Trade request accepted");
    } else {
      toast.info("Trade request declined");
    }
  };

  const value = {
    books,
    userBooks,
    availableBooks,
    tradeOffers,
    isLoading,
    addBook,
    updateBook,
    deleteBook,
    sendTradeOffer,
    respondToTradeOffer,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
