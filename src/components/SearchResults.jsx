'use client'

import { motion } from "framer-motion"
import AktivitetsCard from "./cards/AktivitetCard"

export default function SearchResults({ results }) {
    if (results.length === 0) {
        return (
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center text-gray-400"
            >
                Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet
            </motion.p>
        )
    }

    return (
        <motion.ul 
            className="mt-8 space-y-6 pb-12 snap-y"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
        >
            {results.map((aktivitet) => (
                <AktivitetsCard aktivitet={aktivitet} key={aktivitet.id} />
            ))}
        </motion.ul>
    )
}