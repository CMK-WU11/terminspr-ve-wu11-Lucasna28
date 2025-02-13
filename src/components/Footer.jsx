import { Calendar, Home, Search } from "lucide-react";
import Link from "next/link";

export default function Footer(){
    return(
        <footer className="bg-white w-full h-18 fixed bottom-0 p-2 z-40">
            <ul className="flex justify-evenly">
                <li className="rounded-full border-black border-2 p-2 ">
                    <Link href="/aktiviteter">
                    <Home />
                    <span className="sr-only">Hjem</span>
                    </Link>
                </li>
                <li className="rounded-full border-black border-2 p-2 ">
                    <Link href="/soeg">
                        <Search />
                        <span className="sr-only">Søg</span>
                    </Link>
                </li>
                <li className="rounded-full border-black border-2 p-2 ">
                    <Link href="/kalender">
                        <Calendar />
                        <span className="sr-only">Kalender</span>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}