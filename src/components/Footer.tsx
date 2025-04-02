
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-auto bg-muted/30">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Book className="h-6 w-6 text-bookswap-brown" strokeWidth={1.5} />
              <h2 className="text-xl font-bold text-bookswap-brown">
                BookSwap<span className="text-bookswap-teal">Network</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Connect with book lovers and exchange your favorite reads. BookSwapNetwork
              makes it easy to share stories and discover new worlds.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  My Library
                </Link>
              </li>
              <li>
                <Link to="/trades" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  My Trades
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} BookSwapNetwork. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
