"use client";

import React from "react";
import { useUserById } from "@/hooks/useUserById";
import { useParams } from "next/navigation";
import UserProfile from "@/components/userSections/UserProfile";
import UserOrders from "@/components/userSections/UserOrders";

const UserDashboard = () => {
  const { id } = useParams();
  const { currentUser, userIsLoading, userError } = useUserById(id);

  if (userIsLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading profile</p>;
  if (!currentUser) return <p>User not found</p>;
  

  return (
    <div className="w-11/12 mx-auto min-h-screen space-y-20 py-20">
      <UserProfile currentUser={currentUser} />
      <UserOrders currentUser={currentUser} />
    </div>
  );
};

export default UserDashboard;
