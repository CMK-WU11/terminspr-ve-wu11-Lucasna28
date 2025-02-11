import Footer from "@/components/Footer";

export default function aktiviteterLayout({ children }) {
	return (
		<>
			<main className="bg-background text-white w-full mb-16 overflow-scroll"> 
				{children}
			</main>
            <Footer />
		</>
	)
}