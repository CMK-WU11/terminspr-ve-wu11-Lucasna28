export default function AktivitetDetaljerSkeleton() {
    return (
        <div className="p-4">
            <div className="relative h-[300px] rounded-lg overflow-hidden bg-gray-200 animate-pulse" />
            <div className="mt-4 space-y-4">
                <div>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mt-2" />
                </div>
                <div className="h-24 bg-gray-200 rounded animate-pulse" />
            </div>
        </div>
    )
} 