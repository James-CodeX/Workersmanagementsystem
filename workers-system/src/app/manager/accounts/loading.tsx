export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg animate-pulse">
                <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-700 rounded w-48"></div>
                    <div className="flex gap-2">
                        <div className="h-10 bg-gray-700 rounded w-32"></div>
                        <div className="h-10 bg-gray-700 rounded w-32"></div>
                    </div>
                </div>
            </div>

            {/* Create Form */}
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg border border-gray-700 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-40 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="h-10 bg-gray-700 rounded"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                </div>
            </div>

            {/* Accounts Table */}
            <div className="rounded-lg bg-gray-800 shadow-lg border border-gray-700 animate-pulse">
                <div className="p-6 space-y-3">
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse">
                    <div className="h-8 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse">
                    <div className="h-8 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse">
                    <div className="h-8 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse">
                    <div className="h-8 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse">
                    <div className="h-8 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                </div>
            </div>
        </div>
    );
}
