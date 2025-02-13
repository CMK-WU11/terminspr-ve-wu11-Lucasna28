"use client"

import Login from "@/actions/login"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"

export default function LoginForm() {
	const [formState, formAction] = useActionState(Login, null)
	const searchParams = useSearchParams()
	const redirectTo = searchParams.get("redirectTo")

	return (
		<form action={formAction} noValidate className="space-y-4 rotate-245 z-10">
			{/*skjult input der sender redirectTo værdien med form data når brugeren logger ind*/}
			<input type="hidden" name="redirectTo" value={redirectTo || ""} />
			<input
				defaultValue={formState?.formData?.username}
				type="text"
				name="username"
				placeholder="Brugernavn"
				className="w-full mt-1 border rounded p-2" 
			/>
			<span className="block text-red-500 bg-black/70">{formState?.errors?.username?._errors[0]}</span>
			<input
				defaultValue={formState?.formData?.password}
				type="password"
				name="password"
				placeholder="Adgangskode"
				className="w-full mt-1 border rounded p-2"
			/>
			<span className="block text-red-500 bg-black/70">{formState?.errors?.password?._errors[0]}</span>
			<div>
				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						name="remember"
						className="rounded" />
					<span className="text-boxColor">Husk mig</span>
				</label>
			</div>
			<span className="block text-red-500 bg-black/70">{formState?.error}</span>
			<button type="submit" className="w-full p-2 bg-background text-white rounded">
				Log ind
			</button>
		</form>
	)
}