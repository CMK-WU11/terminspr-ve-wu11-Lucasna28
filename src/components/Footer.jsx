import { Calendar, Home, Search } from "lucide-react";
import Link from "next/link";

export default function Footer(){
    return(
        <footer className="bg-white w-full h-18 fixed bottom-0 p-2 z-40">
            <ul className="flex justify-evenly">
                <li className="rounded-full border-black border-2 p-2 ">
                    <Link href="/aktiviteter">
                    <Home />
                    </Link>
                </li>
                <li className="rounded-full border-black border-2 p-2 ">
                    <Link href="/sog">
                        <Search />
                    </Link>
                </li>
                <li className="rounded-full border-black border-2 p-2 ">
                    <Link href="/kalender">
                        <Calendar />
                    </Link>
                </li>
            </ul>
        </footer>
    )
}