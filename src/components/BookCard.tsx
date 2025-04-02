
import { useState } from "react";
import { Book } from "../types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, BookOpen } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useBooks } from "../contexts/BookContext";
import { toast } from "sonner";
import BookDetailModal from "./BookDetailModal";

interface BookCardProps {
  book: Book;
  isUserBook?: boolean;
}

const BookCard = ({ book, isUserBook = false }: BookCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { currentUser } = useUser();
  const { sendTradeOffer, deleteBook } = useBooks();

  const handleTradeRequest = () => {
    if (!currentUser) {
      toast.error("Please log in to request a trade");
      return;
    }
    sendTradeOffer(book.id);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book from your library?")) {
      deleteBook(book.id);
    }
  };

  const getConditionColor = () => {
    switch (book.condition) {
      case "Like New":
        return "bg-green-100 text-green-800";
      case "Very Good":
        return "bg-emerald-100 text-emerald-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Acceptable":
        return "bg-yellow-100 text-yellow-800";
      case "Poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Card className="h-full overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={book.coverUrl}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover book-cover"
            onError={(e) => {
              e.currentTarget.src = "https://source.unsplash.com/random/300x450?book";
            }}
          />
          {book.genre && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs">
                {book.genre}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="space-y-1">
            <h3 className="font-semibold line-clamp-1 text-lg">{book.title}</h3>
            <p className="text-muted-foreground text-sm">
              by {book.author}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className={getConditionColor()}>
                {book.condition}
              </Badge>
              {!book.isAvailable && (
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  Not Available
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="w-full flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setShowDetails(true)}
            >
              <BookOpen className="mr-1 h-4 w-4" />
              Details
            </Button>
            {isUserBook ? (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-destructive hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash className="mr-1 h-4 w-4" />
                Remove
              </Button>
            ) : (
              book.isAvailable && (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={handleTradeRequest}
                >
                  Request Trade
                </Button>
              )
            )}
          </div>
        </CardFooter>
      </Card>
      
      {showDetails && (
        <BookDetailModal 
          book={book} 
          isUserBook={isUserBook} 
          onClose={() => setShowDetails(false)}
          onRequestTrade={handleTradeRequest}
        />
      )}
    </>
  );
};

export default BookCard;
