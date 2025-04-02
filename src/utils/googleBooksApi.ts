
import { toast } from "sonner";

export interface GoogleBookData {
  title: string;
  author: string;
  coverUrl: string;
  description?: string;
  genre?: string;
  year?: number;
  isbn?: string;
}

export async function fetchBookByISBN(isbn: string): Promise<GoogleBookData | null> {
  try {
    // Remove any hyphens or spaces from the ISBN
    const cleanedIsbn = isbn.replace(/[-\s]/g, '');
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanedIsbn}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch book data');
    }
    
    const data = await response.json();
    
    // Check if we got any results
    if (!data.items || data.items.length === 0) {
      toast.error('No book found with that ISBN');
      return null;
    }
    
    const bookData = data.items[0].volumeInfo;
    
    // Extract the relevant information
    const bookDetails: GoogleBookData = {
      title: bookData.title || '',
      author: bookData.authors ? bookData.authors.join(', ') : 'Unknown Author',
      coverUrl: bookData.imageLinks?.thumbnail || '',
      description: bookData.description || '',
      genre: bookData.categories ? bookData.categories[0] : undefined,
      year: bookData.publishedDate ? new Date(bookData.publishedDate).getFullYear() : undefined,
      isbn: cleanedIsbn
    };
    
    return bookDetails;
  } catch (error) {
    console.error('Error fetching book data:', error);
    toast.error('Failed to fetch book data. Please try again or enter details manually.');
    return null;
  }
}
