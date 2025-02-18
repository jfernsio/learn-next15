type User = {
    // Unique identifier for the user
    id: number,
    // Full name of the user
    name: string,
    // Email address of the user
    email: string,
    // Username chosen by the user
    username: string
}

/**
 * Fetches and displays a list of users from the server.
 * 
 * @returns A JSX element containing the list of users.
 */
/**
 * Server component that fetches and displays a list of users.
 * 
 * This component:
 * - Simulates a server delay of 3 seconds
 * - Fetches user data from JSONPlaceholder API
 * - Renders users in an unordered list
 * 
 * @returns {Promise<JSX.Element>} A Promise that resolves to a JSX element containing the list of users
 * 
 * @example
 * ```tsx
 * <UsersServer />
 * ```
 * 
 * @remarks
 * This is a server component and must be used with Next.js server-side rendering.
 * The component includes artificial delay to demonstrate loading states.
 */
export default async function UsersServer() {
    // Simulate a delay to mimic server response time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Fetch the list of users from the server
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await res.json()

    // Return a JSX element containing the list of users
    return (
        // Unordered list with a class for styling
        <ul className="space-y-4 p-4">
            {users.map((user: User) => (
                // List item for each user, with a unique key
                <li key={user.id}>
                    // Display the user's name as a heading
                    <h2>{user.name}</h2>
                    // Display the user's email address
                    <p>{user.email}</p>
                </li>
            ))}
        </ul>
    )
}