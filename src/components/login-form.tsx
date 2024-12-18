"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
const url=process.env.NEXT_PUBLIC_BACKEND_URL;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    const form = event.target as HTMLFormElement
    const username = (form.username as HTMLInputElement).value
    const password = (form.password as HTMLInputElement).value

    try {
      const response = await fetch(`${url}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        //alert("Login successful!")
        localStorage.setItem("id",username)
        router.push("/dashboard")
      } else {
        alert(data.message || "Login failed")
      }
    } catch (err) {
      console.error(err)
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-white">Username</Label>
        <Input
          id="username"
          placeholder="Enter your username"
          required
          type="text"
          className="bg-white/10 border-white/20 text-white placeholder:text-zinc-400"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input
          id="password"
          placeholder="Enter your password"
          required
          type="password"
          className="bg-white/10 border-white/20 text-white placeholder:text-zinc-400"
        />
      </div>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
      <div className="text-center">
        <Link href="/forgot-password" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Forgot password?
        </Link>
      </div>
    </form>
  )
}
