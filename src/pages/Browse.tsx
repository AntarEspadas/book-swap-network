
import { useState } from "react";
import { useBooks } from "../contexts/BookContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BookCard from "../components/BookCard";
import { Search, BookOpen } from "lucide-react";

const Browse = () => {
  const { availableBooks, isLoading } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterCondition, setFilterCondition] = useState("");

  // Get unique genres from books
  const genres = Array.from(
    new Set(availableBooks.map((book) => book.genre).filter(Boolean))
  );

  // Filter books based on search and filters
  const filteredBooks = availableBooks.filter((book) => {
    const matchesSearch =
      searchTerm === "" ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre =
      filterGenre === "" || book.genre === filterGenre;
    
    const matchesCondition =
      filterCondition === "" || book.condition === filterCondition;
    
    return matchesSearch && matchesGenre && matchesCondition;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Available Books</h1>
          <p className="text-muted-foreground">
            Discover books shared by our community members
          </p>
        </div>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or author..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={filterGenre} onValueChange={setFilterGenre}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre || ""}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterCondition} onValueChange={setFilterCondition}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Condition</SelectItem>
                <SelectItem value="Like New">Like New</SelectItem>
                <SelectItem value="Very Good">Very Good</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Acceptable">Acceptable</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse">Loading...</div>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mb-4" strokeWidth={1} />
          <h3 className="text-xl font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground max-w-md">
            No books match your current search or filters. Try adjusting your search criteria or check back later for new additions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Browse;
