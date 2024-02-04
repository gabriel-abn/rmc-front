"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import fetch from "@/fetch/http";
import { User } from "@/types/user";
import * as React from "react";
import EditProfile from "./components/EditProfile";
import EditTags from "./components/EditTags";

export default function ProfilePage() {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const set = async () => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) return;

      fetch({
        url: "/account/profile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .GET()
        .then((res) => {
          setUser(res);
        });
    };

    set();
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return user ? (
    <div className="flex flex-col space-y-2 items-center justify-center h-screen">
      <Card className="w-1/2 bg-gray-400">
        <CardHeader className="flex items-center">
          <CardTitle>{user?.username}</CardTitle>
          <CardDescription className="text-base font-semibold">
            {user?.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{user?.role}</p>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <div className="space-x-2">
            {user?.tags.map((tag) => (
              <Badge key={tag}>{"#" + tag}</Badge>
            ))}
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-row space-x-2 items-center justify-center w-1/2">
        <EditProfile />
        <EditTags tags={user?.tags} />
        <Button className="w-full">Logout</Button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
