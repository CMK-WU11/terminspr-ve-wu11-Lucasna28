import Button from "./Button"
import { serverFetch } from "@/lib/server-fetch"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function AddButton({ aktivitetId, erTilmeldt, token, userId }) {
    if (!token || !userId) {
        
        return (
            <Button href="/logind">
                Log ind for tilmeldning
            </Button>
        )
    }

    async function handleTilmeldning() {
        "use server"
        
        try {
            const result = await serverFetch(
                `http://localhost:4000/api/v1/users/${userId}/activities/${aktivitetId}`,

                {
                    method: erTilmeldt ? "DELETE" : "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            
            
            // Revalidate og redirect
            revalidatePath('/kalender')
            revalidatePath(`/aktiviteter/${aktivitetId}`)
            redirect(`/aktiviteter/${aktivitetId}`)
        } catch (error) {
            console.error("Fejl ved tilmelding/afmelding:", error)
        }
    }

    return (
        <form action={handleTilmeldning}>
            <Button>
                {erTilmeldt ? "Forlad" : "Tilmeld"}
            </Button>
        </form>
    )
}