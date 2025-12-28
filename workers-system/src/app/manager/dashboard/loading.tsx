export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="flex gap-2">
                    <div className="h-10 bg-gray-700 rounded w-32"></div>
                    <div className="h-10 bg-gray-700 rounded w-32"></div>
                    <div className="h-10 bg-gray-700 rounded w-32"></div>
                </div>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-16 bg-gray-700 rounded"></div>
                    <div className="h-16 bg-gray-700 rounded"></div>
                    <div className="h-16 bg-gray-700 rounded"></div>
                </div>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-64 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    );
}
