
import { useBooks } from "../contexts/BookContext";
import { useUser } from "../contexts/UserContext";
import { Button } from "@/components/ui/button";
import BookCard from "../components/BookCard";
import AddBookForm from "../components/AddBookForm";
import { BookOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const { userBooks, isLoading } = useBooks();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!currentUser && !isLoading) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Library</h1>
          <p className="text-muted-foreground">
            Manage your collection of books available for trading
          </p>
        </div>
        <AddBookForm />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse">Loading...</div>
        </div>
      ) : userBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {userBooks.map((book) => (
            <BookCard key={book.id} book={book} isUserBook={true} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mb-4" strokeWidth={1} />
          <h3 className="text-xl font-medium mb-2">Your library is empty</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Start adding books to your collection to make them available for trading with other members.
          </p>
          <AddBookForm />
        </div>
      )}
    </div>
  );
};

export default Library;
