
export default function AktiviteterSkeleton(){
    return(
        <li className="w-full h-[20rem] rounded-t-[2rem] rounded-bl-[2rem] overflow-hidden shadow-md flex flex-col justify-end relative">
            <div className="h-full w-full bg-gray-200 animate-pulse" />
            <div className="h-24 w-full bg-gray-300 rounded-tr-[3rem] animate-pulse flex flex-col justify-center gap-3 absolute bottom-0">
                <div className="h-6 w-48 bg-gray-400 rounded animate-pulse ml-6" />
                <div className="h-4 w-32 bg-gray-400 rounded animate-pulse ml-6" />
            </div>
        </li>
    )
}