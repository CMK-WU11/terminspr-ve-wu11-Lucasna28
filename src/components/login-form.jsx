"use client"

import Login from "@/actions/login"
import { useActionState } from "react"
import Button from "./Button"

export default function LoginForm() {
	const [formState, formAction] = useActionState(Login, null)

	return (
		<form action={formAction} noValidate className="space-y-4">

					<input
						defaultValue={formState?.formData?.username}
						type="text"
						name="username"
						placeholder="Brugernavn"
						className="w-full mt-1 border rounded p-2" />

				<span className="block text-red-600">{formState?.errors?.username?._errors[0]}</span>


					<input
						defaultValue={formState?.formData?.password}
						type="password"
						name="password"
						placeholder="Adgangskode"
						className="w-full mt-1 border rounded p-2" />

				<span className="block text-red-600">{formState?.errors?.password?._errors[0]}</span>
			<div>
				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						name="remember"
						className="rounded" />
					<span className="text-boxColor">Husk mig</span>
				</label>
			</div>
			<span className="block text-red-600">{formState?.error}</span>
			<Button type="submit">
				Log ind 
			</Button>
		</form>
	)
}