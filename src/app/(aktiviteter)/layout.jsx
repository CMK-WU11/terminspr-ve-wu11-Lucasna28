import Footer from "@/components/Footer";

export default function aktiviteterLayout({ children }) {
	return (
		<>
			<main className="bg-background text-white w-full h-screen overflow-scroll"> 
				{children}
			</main>
            <Footer />
		</>
	)
}