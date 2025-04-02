
import { useBooks } from "../contexts/BookContext";
import { useUser } from "../contexts/UserContext";
import TradeOfferCard from "../components/TradeOfferCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";

const Trades = () => {
  const { tradeOffers, isLoading } = useBooks();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!currentUser && !isLoading) {
    navigate("/login");
    return null;
  }

  // Filter trade offers for current user
  const receivedOffers = tradeOffers.filter(
    (offer) => offer.ownerId === currentUser?.id
  );
  
  const sentOffers = tradeOffers.filter(
    (offer) => offer.requesterId === currentUser?.id
  );

  // Group offers by status
  const pendingReceived = receivedOffers.filter((o) => o.status === "pending");
  const historyReceived = receivedOffers.filter((o) => o.status !== "pending");
  const pendingSent = sentOffers.filter((o) => o.status === "pending");
  const historySent = sentOffers.filter((o) => o.status !== "pending");

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">My Trades</h1>
      <p className="text-muted-foreground mb-8">
        Manage your book trade requests and offers
      </p>

      <Tabs defaultValue="received" className="max-w-3xl">
        <TabsList className="mb-6">
          <TabsTrigger value="received">Received Requests</TabsTrigger>
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="received">
          <h2 className="text-xl font-semibold mb-4">Requests for Your Books</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-pulse">Loading...</div>
            </div>
          ) : (
            <>
              {pendingReceived.length > 0 ? (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">Pending ({pendingReceived.length})</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {pendingReceived.map((offer) => (
                      <TradeOfferCard key={offer.id} tradeOffer={offer} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-6 text-center mb-8">
                  <p className="text-muted-foreground">
                    You don't have any pending requests for your books.
                  </p>
                </div>
              )}

              {historyReceived.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">History</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {historyReceived.map((offer) => (
                      <TradeOfferCard key={offer.id} tradeOffer={offer} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="sent">
          <h2 className="text-xl font-semibold mb-4">Your Book Requests</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-pulse">Loading...</div>
            </div>
          ) : (
            <>
              {pendingSent.length > 0 ? (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">Pending ({pendingSent.length})</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {pendingSent.map((offer) => (
                      <TradeOfferCard key={offer.id} tradeOffer={offer} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-6 text-center mb-8">
                  <p className="text-muted-foreground">
                    You don't have any pending requests for books.
                  </p>
                </div>
              )}

              {historySent.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">History</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {historySent.map((offer) => (
                      <TradeOfferCard key={offer.id} tradeOffer={offer} />
                    ))}
                  </div>
                </div>
              )}

              {pendingSent.length === 0 && historySent.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ArrowLeftRight className="h-12 w-12 text-muted-foreground mb-4" strokeWidth={1} />
                  <h3 className="text-lg font-medium mb-2">No trade requests yet</h3>
                  <p className="text-muted-foreground max-w-md mb-4">
                    Browse available books and send trade requests to start exchanging with other members.
                  </p>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Trades;
