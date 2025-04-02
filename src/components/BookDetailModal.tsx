
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book as BookIcon } from "lucide-react";
import { Book } from "../types";
import { useUser } from "../contexts/UserContext";

interface BookDetailModalProps {
  book: Book;
  isUserBook: boolean;
  onClose: () => void;
  onRequestTrade: () => void;
}

const BookDetailModal = ({ book, isUserBook, onClose, onRequestTrade }: BookDetailModalProps) => {
  const { currentUser } = useUser();

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
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>
            by {book.author} {book.year && `(${book.year})`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full flex justify-center">
            <img
              src={book.coverUrl}
              alt={`${book.title} cover`}
              className="w-full max-w-[180px] object-cover rounded shadow-md"
              onError={(e) => {
                e.currentTarget.src = "https://source.unsplash.com/random/300x450?book";
              }}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getConditionColor()}>
                {book.condition}
              </Badge>
              {book.genre && (
                <Badge variant="secondary">{book.genre}</Badge>
              )}
            </div>
            
            <div className="text-sm">
              {!isUserBook && (
                <p>
                  <span className="font-medium">Owner:</span> {book.ownerName}
                </p>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {book.description || "No description available."}
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          {!isUserBook && currentUser && book.isAvailable && (
            <Button onClick={onRequestTrade} className="gap-1">
              <BookIcon className="h-4 w-4" />
              Request Trade
            </Button>
          )}
          
          {!book.isAvailable && (
            <Badge variant="outline" className="bg-gray-100 text-gray-800">
              Not Available
            </Badge>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailModal;
