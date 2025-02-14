import { Suspense } from "react"
import AktiviteterSkeleton from "@/components/skeletons/AktiviteterSkeleton"
import AktivitetsCard from "@/components/cards/AktivitetCard"
import { serverFetch } from "@/lib/server-fetch"
import Header from "@/components/Header"

// Henter aktiviteter fra API'en og viser en loading state i minimum 500ms
async function AktiviteterListe() {
    const data = await serverFetch("http://localhost:4000/api/v1/activities")
    
    // Venter 500ms for at undgå flash af loading state
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return (
        <ul className="p-4 flex flex-col h-max pb-18 justify-start gap-6">
            {data?.map(aktivitet => (
                <AktivitetsCard key={aktivitet.id} aktivitet={aktivitet} />
            ))}
        </ul>
    )
}

export default function Aktiviteter() {
    return (
        <>  
            <Header title="Aktiviteter" />
            
            {/* Suspense viser skeleton komponenter imens data bliver loadet */}
            <Suspense fallback={
                <ul className="p-4 flex flex-col h-screen justify-start gap-6">
                    {[...Array(3)].map((_, i) => (
                        <AktiviteterSkeleton key={i} />
                    ))}
                </ul>
            }>
                <AktiviteterListe />
            </Suspense>
        </>
    )
}