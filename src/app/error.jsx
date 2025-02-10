"use client"

import { useEffect } from "react"

export default function Error({error, reset}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <>
        <h1>Noget gik galt: {error}</h1>
        <button onClick={() => reset()}prøv igen></button>
        </>
    )
}