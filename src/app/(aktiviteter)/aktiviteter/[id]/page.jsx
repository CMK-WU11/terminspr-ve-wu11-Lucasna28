import { Suspense } from "react"
import { serverFetch } from "@/lib/server-fetch"
import { cookies } from "next/headers"
import Image from "next/image"
import AktivitetDetaljerSkeleton from "@/components/skeletons/AktivitetDetaljerSkeleton"
import AddButton from "@/components/AddButton"

// Tjek om brugeren er tilmeldt aktiviteten
async function getTilmeldingsStatus(aktivitet, userId) {
    if (!userId || !aktivitet.users) return false

    //tjekker om brugerens id findes i aktivitetens users array
    return aktivitet.users.some(user => user.id === parseInt(userId))    
}

async function AktivitetDetaljer({ id }) {
    const aktivitet = await serverFetch(`http://localhost:4000/api/v1/activities/${id}`)
    console.log(aktivitet);
    
    const cookieStore = cookies()
    const token = cookieStore.get("landrupDans_token")?.value
    const userId = cookieStore.get("LandrupDans_uid")?.value
    
    const erTilmeldt = await getTilmeldingsStatus(aktivitet, userId)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return (
        <article className="relative h-screen w-screen">
            <div className="w-screen h-2/3 object-contain relative">
                <Image src={aktivitet.asset.url} fill className="object-cover" alt="aktivitets billede" />
                <div className="absolute bottom-10 right-2">
                    <AddButton 
                        aktivitetId={id}
                        erTilmeldt={erTilmeldt}
                        token={token}
                        userId={userId}
                    />
                </div>
            </div>
            <div className="p-8 text-lg">
                <h1 className="text-2xl">{aktivitet.name}</h1>
                <p>{aktivitet.minAge}-{aktivitet.maxAge} år</p>
                <p>{aktivitet.description}</p>
            </div>
        </article>
    )
}

// Default export component
export default function Aktivitet({ params }) {
    return (
        <Suspense fallback={<AktivitetDetaljerSkeleton />}>
            <AktivitetDetaljer id={params.id} />
        </Suspense>
    )
}