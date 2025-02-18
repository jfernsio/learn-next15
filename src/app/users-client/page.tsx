'use client'
import { useState, useEffect } from "react"

type User = {
    id:number,
    name:string,
    email:string,
    username:string
}
/**
 * A client-side component that fetches and displays a list of users.
 * 
 * @component
 * @returns {JSX.Element} A list of users with their names and emails, 
 * or loading/error states when appropriate
 * 
 * @example
 * ```tsx
 * <UsersClient />
 * ```
 * 
 * The component handles three states:
 * - Loading: Shows a loading message while fetching data
 * - Error: Displays an error message if the fetch fails
 * - Success: Renders a list of users with their names and emails
 * 
 * @remarks
 * This component uses the JSONPlaceholder API to fetch user data.
 * It implements error handling and loading states using React hooks.
 */
export default function UsersClient() {
    // Initialize state variables to store users, loading status, and error message
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // Use the useEffect hook to fetch users when the component mounts
    useEffect(() => {
        // Define an async function to fetch users
        async function fetchUsers() {
            try {
                // Fetch users from the JSONPlaceholder API
                const response = await fetch("https://jsonplaceholder.typicode.com/users")
                // Check if the response is OK (200-299)
                if (!response.ok) throw new Error("Failed to fetch users")
                // Parse the response data as JSON
                const data = await response.json()
                // Update the users state with the fetched data
                setUsers(data)
            } catch (err) {
                // Set the error message if the fetch fails
                setError('Failed to fetch users')
            } finally {
                // Set the loading status to false after the fetch is complete
                setLoading(false)
            }
        }
        // Call the fetchUsers function
        fetchUsers()
    }, [])

    // Render the loading state if the data is still being fetched
    if (loading) return <div>Loading...</div>
    // Render the error state if the fetch fails
    if (error) return <div>{error}</div>
    // Render the list of users if the data is successfully fetched
    return (
        <div>
            <ul className="space-y-4 p-4">
                {users.map((user) => (
                    <li key={user.id} className="border p-4">
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    )
}