import Link from "next/link"

export default function Button ({ href, type, children}) {

    // Hvis der er en href prop, returner en Link komponent
    if (href) {
        return (
            <Link
                href={href} 
                className="bg-background px-4 py-2 rounded text-white w-full"
            >
                {children}
            </Link>
        )
    }

    return (
        <button
            type={type || "submit"}
            className="bg-background px-4 py-2 rounded text-white w-full"
        >
            {children}
        </button>
    )
}