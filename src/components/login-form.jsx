"use client"

import Login from "@/actions/login"
import { useActionState, useEffect } from "react"

export default function LoginForm() {
	const [formState, formAction, isPending] = useActionState(Login, null)

	useEffect(function () {
		console.log("formState", formState)
	}, [formState])

	return (
		<form action={formAction} noValidate>
			<div>
				<label>
					<span>
						Email
					</span>
					<input
						defaultValue={formState?.formData?.identifier}
						type="email"
						name="identifier"
						className="border" />
				</label>
				<span className="block text-red-600">{formState?.errors?.identifier?._errors[0]}</span>
			</div>
			<div>
				<label>
					<span>
						Adgangskode
					</span>
					<input
						defaultValue={formState?.formData?.password}
						type="password"
						name="password"
						className="border" />
				</label>
				<span className="block text-red-600">{formState?.errors?.password?._errors[0]}</span>
			</div>
			<span className="text-red-600">{formState?.error}</span>
			<button disabled={isPending} type="submit" className="p-2 bg-blue-600 disabled:bg-gray-600 text-white rounded-xl">
				{isPending ? "Logger ind..." : "Log ind"}
			</button>
		</form>
	)
}