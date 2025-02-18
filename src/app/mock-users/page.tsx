import { revalidatePath } from "next/cache"
import {auth , currentUser} from "@clerk/nextjs/server"
type MockUser = {
    id: number,
    name: string
}

// Default exported function for displaying and adding mock users
export default async function MockUsers() {
    
  // Retrieve authentication object and current user from Clerk
const authObj = await auth()
const user = await currentUser()
console.log(authObj)
console.log(user)

    // Fetch existing users from the mock API
    const res = await fetch("https://67b443e3392f4aa94faa13f7.mockapi.io/users")
    const users = await res.json()

    // Server action to add a new user to the mock API
    async function addUser(formData: FormData) {
        'use server' // Directive to indicate a server action

        const name = formData.get("name"); // Get the name input value from the form

        // Send a POST request to add a new user
        const res = await fetch("https://67b443e3392f4aa94faa13f7.mockapi.io/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name }) // Convert name into JSON format for request body
        })

        const newUser = await res.json() // Parse the newly added user data

        // Revalidate the page to show updated user list
        revalidatePath("/mock-users")

        console.log(newUser) // Log the new user to the console (for debugging)
    }

    return (
        <div className="py-10">
            {/* Form to add a new user */}
            <form action={addUser} className="mb-4">
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="border p-2 mr-2" 
                    name="name" 
                    required
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add User
                </button>
            </form>
        
            {/* Display list of users in a grid */}
            <div className="grid grid-cols-4 gap-4 py-10">
                {users.map((user: MockUser) => (
                    <div key={user.id} className="bg-gray-200 p-4 rounded-lg text-white-700">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-sm text-gray-600">User ID: {user.id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
