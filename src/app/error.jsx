"use client"

import Footer from "@/components/Footer"
import { useEffect } from "react"

export default function Error({error, reset}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="h-screen flex flex-col items-center justify-center p-4 bg-background">
            <h1 className="text-2xl mb-4">Noget gik galt</h1>
            <p className="mb-6">{error.message}</p>
            <button 
                onClick={() => reset()}
                className="bg-boxColor px-4 py-2 rounded-lg hover:bg-boxColor/80 transition-colors"
            >
                Prøv igen
            </button>
            <Footer />
        </div>
    )
}