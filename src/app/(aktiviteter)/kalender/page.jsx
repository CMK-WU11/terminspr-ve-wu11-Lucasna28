import KalenderSkeleton from "@/components/skeletons/KalenderSkeleton"

export default function Kalender(){
    return(
        <>
            <h1>Kalender</h1>
            <ul className="p-4 flex flex-col h-full justify-start gap-6">
                <KalenderSkeleton />
                <KalenderSkeleton />
                <KalenderSkeleton />
            </ul>
        </>
    )
}