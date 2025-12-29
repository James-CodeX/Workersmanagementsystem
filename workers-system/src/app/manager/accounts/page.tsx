import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { createAccount } from "@/app/actions";
import { redirect } from "next/navigation";
import AccountRow from "@/components/AccountRow";
import UnassignAllButton from "@/components/UnassignAllButton";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function AccountsTableSection({ searchParams, employees }: { searchParams: { page?: string }, employees: any[] }) {
    const page = Number(searchParams.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const [accounts, totalCount] = await Promise.all([
        prisma.workAccount.findMany({
            select: {
                id: true,
                accountName: true,
                email: true,
                password: true,
                browserType: true,
                status: true,
                recentlyUnpaused: true,
                assignedAt: true,
                employeeId: true,
                initialEarnings: true,
                initialEarningsDate: true,
                finalEarnings: true,
                finalEarningsDate: true,
                isPaid: true,
                paidAt: true,
                employee: {
                    select: {
                        id: true,
                        username: true,
                        role: true
                    }
                }
            },
            orderBy: { assignedAt: "desc" },
            take: limit,
            skip: skip,
        }),
        prisma.workAccount.count(),
    ]);

    const serializedAccounts = accounts.map(account => ({
        ...account,
        initialEarnings: account.initialEarnings ? account.initialEarnings.toString() : null,
        finalEarnings: account.finalEarnings ? account.finalEarnings.toString() : null,
    }));

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="rounded-lg bg-gray-800 shadow-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-[15%]">Account</th>
                            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-[18%]">Email</th>
                            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-[12%]">Password</th>
                            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-[10%]">Browser</th>
                            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-[12%]">Assigned</th>
                            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-[10%]">Status</th>
                            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-[23%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                        {serializedAccounts.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                                    No accounts created yet. Create your first account above.
                                </td>
                            </tr>
                        ) : (
                            serializedAccounts.map((account) => (
                                <AccountRow key={account.id} account={account} employees={employees} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                        Showing {skip + 1} to {Math.min(skip + limit, totalCount)} of {totalCount} accounts
                    </div>
                    <div className="flex gap-2">
                        {page > 1 && (
                            <Link href={`/manager/accounts?page=${page - 1}`} className="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-600">
                                Previous
                            </Link>
                        )}
                        {page < totalPages && (
                            <Link href={`/manager/accounts?page=${page + 1}`} className="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-600">
                                Next
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

async function AccountsStatsSection() {
    try {
        const accounts = await prisma.workAccount.findMany({
            select: {
                status: true,
                employeeId: true,
            },
        });

        const totalCount = accounts.length;
        const activeCount = accounts.filter(a => a.status === "Accepted").length;
        const pausedCount = accounts.filter(a => a.status === "Paused").length;
        const leftCount = accounts.filter(a => a.status === "Left").length;
        const unassignedCount = accounts.filter(a => a.employeeId === null).length;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-2xl font-bold text-white">{totalCount}</div>
                <div className="text-xs text-gray-400">Total Accounts</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-2xl font-bold text-green-500">{activeCount}</div>
                <div className="text-xs text-gray-400">Active</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-2xl font-bold text-yellow-500">{pausedCount}</div>
                <div className="text-xs text-gray-400">Paused</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-2xl font-bold text-red-500">{leftCount}</div>
                <div className="text-xs text-gray-400">Left</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-2xl font-bold text-gray-500">{unassignedCount}</div>
                <div className="text-xs text-gray-400">Unassigned</div>
            </div>
        </div>
    );
    } catch (error) {
        console.error('Error loading account stats:', error);
        return (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-red-700">
                    <div className="text-sm text-red-400">Unable to load statistics</div>
                </div>
            </div>
        );
    }
}

export default async function ManageAccountsPage({ searchParams }: { searchParams: { page?: string } }) {
    try {
        const assignedCount = await prisma.workAccount.count({
            where: { employeeId: { not: null } }
        });

        const employees = await prisma.user.findMany({
            where: { role: "EMPLOYEE" },
            orderBy: { username: "asc" },
        });

        async function createAccountAction(formData: FormData) {
            "use server";
            await createAccount(formData);
            redirect("/manager/accounts");
        }

    return (
        <div className="space-y-6">
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <h2 className="text-2xl font-bold text-white">Manage Accounts</h2>
                    <div className="flex flex-wrap gap-2">
                        <UnassignAllButton assignedCount={assignedCount} />
                        <Link href="/manager/dashboard" className="inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Create New Account Form */}
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Create New Account</h3>
                <form action={createAccountAction} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label htmlFor="accountName" className="block text-xs font-medium text-gray-300 mb-1">
                            Account Name *
                        </label>
                        <input
                            type="text"
                            name="accountName"
                            id="accountName"
                            required
                            placeholder="e.g., John Doe"
                            className="block w-full rounded-md border-gray-600 bg-gray-700 text-white text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="email@example.com"
                            className="block w-full rounded-md border-gray-600 bg-gray-700 text-white text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1">
                            Password *
                        </label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            required
                            placeholder="Account password"
                            className="block w-full rounded-md border-gray-600 bg-gray-700 text-white text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="browserType" className="block text-xs font-medium text-gray-300 mb-1">
                            Browser Type *
                        </label>
                        <select
                            name="browserType"
                            id="browserType"
                            required
                            className="block w-full rounded-md border-gray-600 bg-gray-700 text-white text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        >
                            <option value="IX Browser">IX Browser</option>
                            <option value="GoLogin">GoLogin</option>
                            <option value="More Login">More Login</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <svg className="inline-block mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Add Account
                        </button>
                    </div>
                </form>
            </div>

            {/* Accounts List */}
            <Suspense fallback={
                <div className="rounded-lg bg-gray-800 shadow-lg border border-gray-700 overflow-hidden animate-pulse">
                    <div className="h-96 bg-gray-700 rounded"></div>
                </div>
            }>
                <AccountsTableSection searchParams={searchParams} employees={employees} />
            </Suspense>

            {/* Statistics */}
            <Suspense fallback={
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse">
                            <div className="h-8 bg-gray-700 rounded mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-20"></div>
                        </div>
                    ))}
                </div>
            }>
                <AccountsStatsSection />
            </Suspense>
        </div>
    );
    } catch (error) {
        console.error('Error loading accounts page:', error);
        return (
            <div className="space-y-6">
                <div className="rounded-lg bg-gray-800 p-6 shadow-lg border border-red-700">
                    <h2 className="text-xl font-bold text-red-400">Unable to load accounts</h2>
                    <p className="text-gray-300 mt-2">Database connection error. Please try again.</p>
                    <Link href="/manager/dashboard" className="mt-4 inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }
}
