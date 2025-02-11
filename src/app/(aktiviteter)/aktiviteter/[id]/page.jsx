import { Suspense } from "react"
import { serverFetch } from "@/lib/server-fetch"
import { cookies } from "next/headers"
import Image from "next/image"
import AktivitetDetaljerSkeleton from "@/components/skeletons/AktivitetDetaljerSkeleton"
import AddButton from "@/components/AddButton"

// Tjek om brugeren er tilmeldt aktiviteten
async function getTilmeldingsStatus(aktivitetId, userId, token) {
    if (!token || !userId) return false
    
    try {
        await serverFetch(
            `http://localhost:4000/api/v1/users/${userId}/activities/${aktivitetId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        return true
    } catch {
        return false
    }
}

async function AktivitetDetaljer({ id }) {
    const aktivitet = await serverFetch(`http://localhost:4000/api/v1/activities/${id}`)
    const cookieStore = cookies()
    const token = cookieStore.get("landrupDans_token")?.value
    const userId = cookieStore.get("LandrupDans_uid")?.value
    
    const erTilmeldt = await getTilmeldingsStatus(id, userId, token)
    
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