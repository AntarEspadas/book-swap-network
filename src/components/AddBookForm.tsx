
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBooks } from "../contexts/BookContext";
import { fetchBookByISBN, GoogleBookData } from "../utils/googleBooksApi";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverUrl: z.string().url("Please provide a valid URL").or(z.string().length(0)),
  description: z.string().optional(),
  condition: z.enum(["Like New", "Very Good", "Good", "Acceptable", "Poor"]),
  genre: z.string().optional(),
  year: z.number().positive().int().optional().or(z.string().transform(val => {
    const parsed = parseInt(val);
    return isNaN(parsed) ? undefined : parsed;
  })),
  isbn: z.string().optional(),
});

type BookFormData = z.infer<typeof bookSchema>;

const AddBookForm = () => {
  const [open, setOpen] = useState(false);
  const [isbnInput, setIsbnInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const { addBook } = useBooks();

  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      coverUrl: "",
      description: "",
      condition: "Good",
      genre: "",
      year: undefined,
      isbn: "",
    },
  });

  const handleSearchByIsbn = async () => {
    if (!isbnInput.trim()) {
      toast.error("Please enter an ISBN");
      return;
    }

    setIsLoading(true);
    try {
      const bookDetails = await fetchBookByISBN(isbnInput);
      
      if (bookDetails) {
        // Populate the form with the fetched data
        form.setValue("title", bookDetails.title);
        form.setValue("author", bookDetails.author);
        form.setValue("coverUrl", bookDetails.coverUrl);
        form.setValue("description", bookDetails.description || "");
        form.setValue("genre", bookDetails.genre || "");
        form.setValue("year", bookDetails.year);
        form.setValue("isbn", bookDetails.isbn);
        
        toast.success("Book details found!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: BookFormData) => {
    // Use a default cover image if none provided
    if (!data.coverUrl) {
      data.coverUrl = `https://source.unsplash.com/random/300x450?book,${encodeURIComponent(data.title.replace(/\s+/g, ','))}`;
    }
    
    addBook(data);
    form.reset();
    setIsbnInput("");
    setIsManualEntry(false);
    setOpen(false);
  };

  const resetForm = () => {
    form.reset();
    setIsbnInput("");
    setIsManualEntry(false);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={18} />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new book to your library</DialogTitle>
        </DialogHeader>
        
        {!isManualEntry ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-2">
              Enter the ISBN of your book to automatically fetch its details
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Enter ISBN (e.g., 978-3-16-148410-0)"
                value={isbnInput}
                onChange={(e) => setIsbnInput(e.target.value)}
              />
              <Button 
                onClick={handleSearchByIsbn}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="link" 
                onClick={() => setIsManualEntry(true)}
                className="p-0 text-sm"
              >
                Or enter details manually
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Book title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Very Good">Very Good</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Acceptable">Acceptable</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="Publication year" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Fiction, Mystery, Sci-Fi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="coverUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/book-cover.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the book" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 9781234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Book</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddBookForm;
