"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { signupAction } from "@/actions/signupAction";
import { ZodErrors } from "./ZodErrors";
import ActionButton from "./ActionButton";

export function SignUpForm() {
  const [state, action] = useFormState(signupAction, undefined);

  return (
    <div className="w-full max-w-md">
      <form action={action}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              <ZodErrors error={state?.errors?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors error={state?.errors?.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={state?.errors?.password} />
            </div>

            {state?.error && (
              <div className="text-gray-900 text-xs mt-1 py-3 text-center bg-red-400 rounded-md">
                {state?.error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col">
            <ActionButton title="Sign Up" className="w-full" />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="signin">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
