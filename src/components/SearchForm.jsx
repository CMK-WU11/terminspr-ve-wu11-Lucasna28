'use client'

import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { motion } from "framer-motion"

export default function SearchInput({ defaultValue = "" }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    function handleSearch(term) {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }
        
        startTransition(() => {
            router.replace(`/soeg?${params.toString()}`)
        })
    }

    return (
        <motion.form 
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <input
                type="search"
                defaultValue={defaultValue}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Søg efter aktiviteter..."
                className="w-full p-3 pl-10 rounded-lg bg-[#C4C4C4]/30 focus:border-boxColor focus:outline focus:outline-boxColor"
            />
            <Search className="absolute right-9 top-3.5 text-white size-6" />
        </motion.form>
    )
} 