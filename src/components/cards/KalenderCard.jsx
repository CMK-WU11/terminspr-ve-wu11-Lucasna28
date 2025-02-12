import Link from "next/link"
import * as motion from "motion/react-client"

export default function KalenderCard({ aktivitet, erInstruktor }) {
    // Bestem hvilken side der skal linkes til
    const linkPath = erInstruktor 
        ? `/kalender/hold/${aktivitet.id}` 
        : `/aktiviteter/${aktivitet.id}`

    return (
        <motion.li 
            className="w-full border rounded-lg overflow-hidden p-4 bg-white shadow-md"
            initial={{ opacity: 0, x: 20}}
            animate={{ opacity: 1, x: 0}}
            transition={{ duration: 0.5, ease: "easeOut", staggerChildren: 0.2}}
        >
            <Link href={linkPath}>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-medium text-black">
                            {aktivitet.name}
                        </h2>
                        <p className="text-gray-600">
                            {aktivitet.weekday} {aktivitet.time}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.li>
    )
}