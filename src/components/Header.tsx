
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, Menu } from "lucide-react";

const Header = () => {
  const { currentUser, logout } = useUser();

  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <Book className="h-7 w-7 text-bookswap-brown" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-bookswap-brown">
            BookSwap<span className="text-bookswap-teal">Network</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/browse"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Books
          </Link>
          {currentUser && (
            <>
              <Link
                to="/library"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                My Library
              </Link>
              <Link
                to="/trades"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                My Trades
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.username} />
                  <AvatarFallback className="bg-bookswap-cream text-bookswap-brown">
                    {currentUser.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium">{currentUser.username}</span>
              </Link>
              <Button
                variant="outline"
                onClick={logout}
                className="hidden md:inline-flex"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
