"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifyEmail } from "./fetch";

const verifyEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  code: z
    .string()
    .min(8, { message: "Invalid verification code." })
    .max(8, { message: "Invalid verification code." })
    .toUpperCase(),
});

export default function VerifyEmail() {
  if (!sessionStorage.getItem("accessToken")) {
    window.location.href = "/";
  }

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
  });

  async function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    await verifyEmail({
      email: data.email,
      code: data.code,
    }).then(({ isVerified, message }) => {
      console.log(isVerified, message);
      if (isVerified || message === "EMAIL_ALREADY_VERIFIED") {
        window.location.href = "/feed";
        return;
      }
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-green-950 rounded-md p-4 w-96"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Verify account
          </Button>
        </form>
      </Form>
    </div>
  );
}
