import { Suspense } from "react"
import KalenderCard from "@/components/cards/KalenderCard"
import { serverFetch } from "@/lib/server-fetch"
import Header from "@/components/Header"
import KalenderSkeleton from "@/components/skeletons/KalenderSkeleton"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import * as motion from "motion/react-client"

async function AktiviteterListe() {
    const cookieStore = await cookies()
    const token = cookieStore.get("landrupDans_token")
    const userId = cookieStore.get("LandrupDans_uid")
    
    if (!token || !userId) {
        redirect("/logind")
    }

    try {
        // Hent brugerdata for at tjekke rolle
        const userData = await serverFetch(
            `http://localhost:4000/api/v1/users/${userId.value}`,
            {
                headers: {
                    "Authorization": `Bearer ${token.value}`
                }
            }
        )

        const erInstruktor = userData.role === "instructor"

        // Hent alle aktiviteter
        const aktiviteter = await serverFetch(
            "http://localhost:4000/api/v1/activities",
            {
                headers: {
                    "Authorization": `Bearer ${token.value}`
                }
            }
        )

        // Filtrer aktiviteter baseret på brugerens rolle
        const visAktiviteter =  erInstruktor
            ? aktiviteter.filter(aktivitet => aktivitet.instructorId === parseInt(userId.value))
            : userData.activities || []

        await new Promise(resolve => setTimeout(resolve, 500))
        
        return (
            <motion.ul className="p-4 flex flex-col h-screen justify-start gap-6"
                initial={{ opacity: 0, y: 20}}
                animate={{ opacity: 1, y: 0}}
                transition={{ 
                    duration: 0.5, 
                    ease: "easeOut", 
                    staggerChildren: 0.2
                }}
            >
                {visAktiviteter.map(aktivitet => (
                    <KalenderCard 
                        key={aktivitet.id} 
                        aktivitet={aktivitet}
                        erInstruktor={erInstruktor}
                    />
                ))}
            </motion.ul>
        )
    } catch (error) {
        return (
            <div className="p-4 text-red-600">
                Der skete en fejl: {error.message}
            </div>
        )
    }
}

export default async function Kalender() {
    const cookieStore = cookies()
    const token = await cookieStore.get("landrupDans_token")
    
    if (!token) {
        redirect("/logind")
    }
    return (
        <>  
            <Header title="Kalender" />
            <Suspense fallback={
                <motion.ul 
                    className="p-4 flex flex-col h-screen justify-start gap-6"
                    exit={{ opacity: 0 }}
                >
                    {[...Array(3)].map((_, i) => (
                        <KalenderSkeleton key={i} />
                    ))}
                </motion.ul>
            }>
                <AktiviteterListe />
            </Suspense>
        </>
    )
}