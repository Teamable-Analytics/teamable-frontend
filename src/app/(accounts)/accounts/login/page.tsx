"use client"

import Image from "next/image"
import Link from "next/link"
import LoginImage from "@public/login-image.webp"
import { LogInForm } from "@/app/(accounts)/accounts/login/(components)/LogInForm"

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen px-6 sm:px-0">
      <div className="flex items-center justify-center py-12 h-screen">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to access your account
            </p>
          </div>
          <LogInForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={"/accounts/signup"} className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block bg-zinc-900" />
    </div>
  )
}
