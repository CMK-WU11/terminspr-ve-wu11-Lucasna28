"use client"

import Login from "@/actions/login"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import Link from "next/link"
import { Loader2 } from "lucide-react" 

export default function LoginForm() {
  const [formState, setFormState] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false) 
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("landrupDans_token")
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setIsLoading(true) 

    const formData = new FormData(event.target)

    try {
      const result = await Login(null, formData) 
      if (result && result.success) {
        setIsLoggedIn(true)
      } else {
        setError(result?.error || "Der skete en fejl")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Der skete en fejl ved login")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoggedIn) {
    router.refresh()
    return (
      <div className="z-10 text-white">
        <p>Du er allerede logget ind.</p>
        <Link href="/kalender" className="block p-2 bg-blue-500 text-white rounded">
          Gå til kalender
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 z-10">
      <input
        type="text"
        name="username"
        placeholder="Brugernavn"
        className="w-full mt-1 border rounded p-2"
        required
      />
      <span className="block text-red-500 bg-black/70">{formState?.errors?.username?._errors[0]}</span>
      <input
        type="password"
        name="password"
        placeholder="Adgangskode"
        className="w-full mt-1 border rounded p-2"
        required
      />
      <span className="block text-red-500 bg-black/70">{formState?.errors?.password?._errors[0]}</span>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            className="rounded"/>
          <span className="text-boxColor">Husk mig</span>
        </label>
      </div>

      {error && <span className="block text-red-500 bg-black/70">{error}</span>}

      <button
        type="submit"
        className="w-full p-2 bg-background text-white rounded"
        disabled={isLoading} // Deaktiver knappen under loading
      >
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" size={24} />
          </div>
        ) : (
          "Log ind"
        )}
      </button>
    </form>
  )
}