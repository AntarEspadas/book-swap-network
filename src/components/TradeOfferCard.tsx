
import { TradeOffer } from "../types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, ArrowRightLeft } from "lucide-react";
import { useBooks } from "../contexts/BookContext";
import { useUser } from "../contexts/UserContext";
import { format } from "date-fns";

interface TradeOfferCardProps {
  tradeOffer: TradeOffer;
}

const TradeOfferCard = ({ tradeOffer }: TradeOfferCardProps) => {
  const { respondToTradeOffer } = useBooks();
  const { currentUser } = useUser();

  const isOwner = currentUser?.id === tradeOffer.ownerId;
  const isRequester = currentUser?.id === tradeOffer.requesterId;
  const isPending = tradeOffer.status === "pending";
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const getStatusBadge = () => {
    switch (tradeOffer.status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
            <Check className="h-3 w-3" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1">
            <X className="h-3 w-3" />
            Declined
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium text-sm text-muted-foreground">
            {formatDate(tradeOffer.createdAt)}
          </div>
          {getStatusBadge()}
        </div>
        
        <h3 className="font-semibold mb-2 text-lg">
          {tradeOffer.bookTitle}
        </h3>
        
        <div className="flex items-center text-sm mb-2">
          <div className="flex-1">
            <p className="text-muted-foreground">Requester:</p>
            <p className="font-medium">{tradeOffer.requesterName}</p>
          </div>
          <ArrowRightLeft className="mx-2 text-muted-foreground" size={16} />
          <div className="flex-1 text-right">
            <p className="text-muted-foreground">Owner:</p>
            <p className="font-medium">{tradeOffer.ownerName}</p>
          </div>
        </div>
      </CardContent>
      
      {isPending && isOwner && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-red-50 hover:text-red-600"
            onClick={() => respondToTradeOffer(tradeOffer.id, false)}
          >
            <X className="mr-1 h-4 w-4" />
            Decline
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => respondToTradeOffer(tradeOffer.id, true)}
          >
            <Check className="mr-1 h-4 w-4" />
            Accept
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default TradeOfferCard;
