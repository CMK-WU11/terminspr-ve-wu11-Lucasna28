import Button from "./Button"
import { serverFetch } from "@/lib/server-fetch"
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
            await serverFetch(
                `http://localhost:4000/api/v1/users/${userId}/activities/${aktivitetId}`,
                {
                    method: erTilmeldt ? "DELETE" : "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
        } catch (error) {
            console.error("Fejl ved tilmelding:", error)
        }
        redirect(`/aktiviteter/${aktivitetId}`)
    }

    return (
        <form action={handleTilmeldning}>
            <Button>
                {erTilmeldt ? "Forlad" : "Tilmeld"}
            </Button>
        </form>
    )
}