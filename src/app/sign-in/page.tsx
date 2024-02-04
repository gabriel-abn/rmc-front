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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "./fetch";

export default function SignIn() {
  const signInSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must have between 3 and 32 characters" })
      .max(32, { message: "Username must have between 3 and 32 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8),
    instructor: z.boolean(),
  });

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      instructor: false,
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    try {
      let role = "DEVELOPER";

      if (data.instructor) {
        role = "INSTRUCTOR";
      }

      const res = await signIn({
        email: data.email,
        password: data.password,
        username: data.username,
        role,
      }).then((res) => {
        return res.accessToken;
      });

      sessionStorage.setItem("accessToken", res);
      window.location.href = "/verify-email";
    } catch (error) {
      console.log(error);
    }
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input placeholder="my-user-name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="exemple@domain.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instructor"
            render={({ field }) => (
              <FormItem className="space-x-2 align-middle">
                <FormControl>
                  <>
                    <Switch
                      defaultChecked={field.value}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel className="ml-2 text-2xl text-white">
                      Instructor
                    </FormLabel>
                  </>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}
