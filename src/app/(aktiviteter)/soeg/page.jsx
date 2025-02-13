import { Suspense } from "react"
import Header from "@/components/Header"
import SearchResults from "@/components/SearchResults"
import SearchForm from "@/components/SearchForm"
import { serverFetch } from "@/lib/server-fetch"

// Server component der håndterer søgning
async function Search({ searchParams }) {
    const query = (await searchParams)?.q || ""
    
    //tidlig return for at undgå inødvendige API kald
    if (!query) return null

    const aktiviteter = await serverFetch("http://localhost:4000/api/v1/activities")
    
    //ændre til lowercase
    const results = aktiviteter.filter(aktivitet => 
        aktivitet.name.toLowerCase().includes(query.toLowerCase()) ||
        aktivitet.description.toLowerCase().includes(query.toLowerCase())
    )

    return <SearchResults results={results} />
}

export default function SearchPage({ searchParams }) {
    return (
        <>
            <Header title="Søg" />
            <section className="p-4">
                <SearchForm defaultValue={searchParams?.q} />
                <Suspense fallback={
                    <div className="h-24 bg-gray-200 rounded-lg animate-pulse" />
                }>
                    <Search searchParams={searchParams} />
                </Suspense>
            </section>
        </>
    )
}