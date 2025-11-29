"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminUser, useBilling, useDeactivateUser, useActivateUser, useSendMessage } from "@/hook/useUser";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function UserDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [messageText, setMessageText] = React.useState("");

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useAdminUser(id as string);

  const {
    data: billings,
    isLoading: billingLoading,
    isError: billingError,
  } = useBilling();

  const deactivateUser = useDeactivateUser();
  const activateUser = useActivateUser();
  const sendMessage = useSendMessage();

  if (userLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Loading user...</p>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="p-6">
        <p className="text-red-500 text-sm">Failed to load user details.</p>
        <Button onClick={() => router.push("/users")} className="mt-4">
          Back to Users
        </Button>
      </div>
    );
  }

  const userBillingRecords =
    billings?.filter((b) => b.userId === Number(id)) ?? [];

  const handleDeactivate = () => {
    if (confirm("Are you sure you want to deactivate this user?")) {
      deactivateUser.mutate(Number(id), {
        onSuccess: () => {
          router.push("/users");
        },
      });
    }
  };

  const handleActivate = () => {
    activateUser.mutate(Number(id), {
      onSuccess: () => {
        router.push("/users");
      },
    });
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    sendMessage.mutate(
      { userId: id as string, message: messageText },
      {
        onSuccess: () => {
          setMessageText("");
        },
      }
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push("/users")}>
        ← Back to Users
      </Button>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatarUrl ?? ""} />
          <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-xl font-semibold">{user.fullName}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Billing Records */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Billing History</h3>

        {billingLoading ? (
          <p className="text-sm text-muted-foreground">Loading billing...</p>
        ) : billingError ? (
          <p className="text-red-500 text-sm">Failed to load billing data</p>
        ) : userBillingRecords.length === 0 ? (
          <p className="text-sm text-muted-foreground">No billings available</p>
        ) : (
          <div className="space-y-3">
            {userBillingRecords.map((b) => (
              <div
                key={b.id}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {b.status === "paid" ? "Payment" : "Billing Attempt"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(b.createdAt).toLocaleString()}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                      b.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : b.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <p className="font-semibold">${b.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Send Message Section */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Send Message to User</h3>
        <textarea
          className="w-full border rounded p-2 mb-3"
          rows={4}
          placeholder="Type your message here..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={sendMessage.isPending || !messageText.trim()}
        >
          {sendMessage.isPending ? "Sending..." : "Send Message"}
        </Button>
      </div>

      {/* Admin Actions */}
      <div className="flex gap-4 pt-4">
        <Button 
          onClick={handleDeactivate}
          variant="destructive"
          disabled={deactivateUser.isPending}
        >
          {deactivateUser.isPending ? "Deactivating..." : "Deactivate User"}
        </Button>
        <Button 
          onClick={handleActivate}
          variant="outline"
          disabled={activateUser.isPending}
        >
          {activateUser.isPending ? "Activating..." : "Activate User"}
        </Button>
      </div>
    </div>
  );
}