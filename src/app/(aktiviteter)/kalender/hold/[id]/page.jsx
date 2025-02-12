import Header from "@/components/Header";
import { serverFetch } from "@/lib/server-fetch";

export default async function HoldOversigt({ params}) {
    const aktivitet = await serverFetch(`http://localhost:4000/api/v1/activities/${params.id}`)

    return (
        <>
        
            <Header title={aktivitet.name} />
            <section className="p-4 h-screen">
                <h2>Hold Oversigt</h2>
                {aktivitet.users?.length > 0 ? (
                    <ul className="space-y-2">
                        {aktivitet.users.map(user => (
                            <li key={user.id} className="bg-white text-black p-3 rounded">
                                {user.firstname} {user.lastname}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>ingen tilmeldte deltagere endnu</p>
                )}
            </section>
        </>
    )
}