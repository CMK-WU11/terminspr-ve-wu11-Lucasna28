import AktiviteterSkeleton from "@/components/skeletons/AktiviteterSkeleton"
import AktivitetsCard from "@/components/cards/AktivitetCard"
import { serverFetch } from "@/lib/server-fetch"

export default async function aktiviteter(){
    const data = await serverFetch("http://localhost:4000/api/v1/assets")
    console.log(aktiviteter);
    
    return(
        <>  
            <header className="">
                <h1 className="text-boxColor text-[36px]">Aktiviteter</h1>
            </header>
            <ul className="p-4 flex flex-col h-full justify-start gap-6">
                {data.map(aktiviteter => <AktivitetsCard key={aktiviteter.id} aktivitet={aktiviteter} />)} 
                <AktiviteterSkeleton />
                <AktiviteterSkeleton />
                <AktiviteterSkeleton />
            </ul>
        </>
    )
}