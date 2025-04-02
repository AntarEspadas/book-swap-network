
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const Profile = () => {
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    location: currentUser?.location || "",
    bio: currentUser?.bio || "",
  });

  // Redirect if not logged in
  if (!currentUser && !isLoading) {
    navigate("/login");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user in the database
    toast.success("Profile updated successfully!");
  };

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="text-muted-foreground mb-8">
        Manage your personal information
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.username} />
              <AvatarFallback className="bg-bookswap-cream text-bookswap-brown text-xl">
                {currentUser?.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{currentUser?.username}</h2>
            <p className="text-sm text-muted-foreground text-center">
              Member since {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself and your reading preferences"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <div className="pt-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
          
          <div className="mt-8 bg-muted/30 p-4 rounded-lg text-sm text-center">
            <p className="text-muted-foreground">
              <strong>Demo Mode:</strong> Profile changes won't be permanently saved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
