import { Suspense } from "react"
import { serverFetch } from "@/lib/server-fetch"
import { cookies } from "next/headers"
import Image from "next/image"
import AktivitetDetaljerSkeleton from "@/components/skeletons/AktivitetDetaljerSkeleton"
import AddButton from "@/components/AddButton"
import { Calendar, Clock, Users } from "lucide-react"

// Tjek om brugeren er tilmeldt aktiviteten
async function getTilmeldingsStatus(aktivitet, userId) {
    if (!userId || !aktivitet.users) return false

    //tjekker om brugerens id findes i aktivitetens users array
    return aktivitet.users.some(user => user.id === parseInt(userId))    
}

async function AktivitetDetaljer({ id }) {
    const aktivitet = await serverFetch(`http://localhost:4000/api/v1/activities/${id}`)
    const cookieStore = cookies()
    const token = cookieStore.get("landrupDans_token")?.value
    const userId = cookieStore.get("LandrupDans_uid")?.value
    
    const erTilmeldt = await getTilmeldingsStatus(aktivitet, userId)
    const antalTilmeldte = aktivitet.users?.length || 0 
    const ledigePladser = aktivitet.maxParticipants - antalTilmeldte
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
            <div className="p-8 text-white text-pretty text-lg">
                <h1 className="text-2xl font-bold">{aktivitet.name}</h1>
                <p>Alder: {aktivitet.minAge}-{aktivitet.maxAge} år</p>
                <div className="flex items-center gap-6 capitalize my-4">
                    <Calendar size={20} />
                    <span className="sr-only">Dato</span>
                    <p>{aktivitet.weekday}</p>
                    <Clock size={20} />
                    <span className="sr-only">Tid</span>
                    <span>{aktivitet.time}</span>
                </div>
                <div className="flex items-center gap-2 ">
                        
                </div>
                <p>Maks. deltagere: {aktivitet.maxParticipants}</p>
                <div className="flex items-center gap-10">
                    <Users size={20} />
                    <span className="sr-only">Brugere</span>
                    <p>
                        {antalTilmeldte} tilmeldte 
                        {aktivitet.maxParticipants && (
                            <span className="ml-1">
                                ({ledigePladser} {ledigePladser === 1 ? ' ledig plads' : ' ledige pladser'})
                            </span>
                        )}
                    </p>
                    </div>
                <p className="text-gray-200 leading-relaxed">
                    {aktivitet.description}
                </p>
            </div>
        </article>
    )
}

// Default export component retunere aktivitetdetaljerskeleton hvis den loader aktivitetdetaljer
export default function Aktivitet({ params }) {
    return (
        <Suspense fallback={<AktivitetDetaljerSkeleton />}>
            <AktivitetDetaljer id={params.id} />
        </Suspense>
    )
}