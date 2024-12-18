import { Logo } from "@/components/logo"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="w-full max-w-md px-8 py-12 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center space-y-8">
          <Logo />
          <h1 className="text-2xl font-bold text-white">Fee Payment Portal</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

