export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg animate-pulse">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="h-8 bg-gray-700 rounded w-48"></div>
                    <div className="flex flex-wrap gap-2">
                        <div className="h-10 bg-gray-700 rounded w-32"></div>
                        <div className="h-10 bg-gray-700 rounded w-40"></div>
                    </div>
                </div>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg border border-gray-700 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-700 rounded"></div>
                    ))}
                </div>
            </div>

            <div className="rounded-lg bg-gray-800 shadow-lg border border-gray-700 overflow-hidden animate-pulse">
                <div className="overflow-x-auto">
                    <div className="h-96 bg-gray-700 rounded"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse">
                        <div className="h-8 bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-20"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
