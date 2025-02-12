import LoginForm from "@/components/login-form"

export default async function Login() {
	return (
		<main className="w-screen h-screen bg-[url(/images/splash-image.jpg)] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center gap-52">
			<div className="absolute bg-black/45 w-[60rem] h-[26rem] p-6 origin-center -rotate-[10.02rad]">
			
			</div>
				<LoginForm />
		</ main>
	)
}