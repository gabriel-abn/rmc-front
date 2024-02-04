import { UserProvider } from "@/context/ProfileContext";
import * as React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <UserProvider>{children}</UserProvider>
    </section>
  );
}
