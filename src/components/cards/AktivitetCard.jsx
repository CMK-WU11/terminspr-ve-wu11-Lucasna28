import Image from "next/image"
import Link from "next/link";

export default function AktivitetsCard({ aktivitet }) {
    return (
        <li className="w-full h-[20rem] rounded-t-[2rem] rounded-bl-[2rem] overflow-hidden shadow-md flex flex-col justify-end relative">
            <Link href={`/aktiviteter/${aktivitet.id}`}>
                <Image 
                    src={aktivitet.asset.url}
                    alt="Aktivitets billede"
                    fill
                    className="object-cover "
                    priority
                />
                <div className="h-20 text-black w-full bg-card/80 backdrop-blur-sm rounded-tr-[3rem] flex flex-col justify-center font-medium relative z-10 text-lg">
                    <h2 className=" ml-6">
                        {aktivitet.name}
                    </h2>
                    <p className="ml-6"> {aktivitet.minAge}-{aktivitet.maxAge} år</p>
                </div>
            </Link>
        </li>
    )
}