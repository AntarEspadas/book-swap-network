
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "../contexts/UserContext";
import { ArrowRight, BookOpen, Users, ArrowLeftRight } from "lucide-react";

const Index = () => {
  const { currentUser } = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-bookswap-cream to-white py-16 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-bookswap-brown">
                Share Books,<br />Connect Readers
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                Join our community of book lovers to exchange books you've read for new adventures. 
                List books, find matches, and expand your library through sharing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {currentUser ? (
                  <>
                    <Link to="/browse">
                      <Button size="lg">
                        Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/library">
                      <Button variant="outline" size="lg">
                        My Library
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg">
                        Join Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative h-80 w-80">
                <div className="absolute top-0 left-0 h-full w-3/4 rotate-[-6deg] transform book-spine">
                  <img 
                    src="https://source.unsplash.com/random/300x450?book,stack" 
                    alt="Stack of books" 
                    className="h-full w-full object-cover rounded shadow-lg"
                  />
                </div>
                <div className="absolute bottom-5 right-0 h-5/6 w-3/4 rotate-[8deg] transform book-spine">
                  <img 
                    src="https://source.unsplash.com/random/300x450?books,library" 
                    alt="Books on shelf" 
                    className="h-full w-full object-cover rounded shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-bookswap-brown">How BookSwap Works</h2>
            <p className="mt-2 text-muted-foreground">
              Exchange books easily in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-bookswap-cream flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-bookswap-brown" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Your Books</h3>
              <p className="text-muted-foreground">
                List books from your collection that you're willing to share with others.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-bookswap-cream flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-bookswap-brown" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Readers</h3>
              <p className="text-muted-foreground">
                Browse available books from other members that match your interests.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-bookswap-cream flex items-center justify-center mb-4">
                <ArrowLeftRight className="h-6 w-6 text-bookswap-brown" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exchange Books</h3>
              <p className="text-muted-foreground">
                Send trade requests and connect with others to exchange books.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/browse">
              <Button>
                Start Browsing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
