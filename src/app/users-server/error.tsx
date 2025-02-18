'use client'

import { useEffect } from "react"

/**
 * Error component to display error messages.
 * 
 * @param {Object} props - Component props.
 * @param {Error} props.error - Error object to be displayed.
 */
export default function Error({error}:{error:Error}) {
    // Use effect hook to log the error when the component mounts or updates.
    useEffect(()=>{
        console.log(error);
    },[error]) // Re-run the effect when the error changes.

    // Return the JSX to be rendered.
    return (
        // Center the content horizontally and vertically.
        <div className="flex items-center justify-center h-screen" >
            // Display the error message in a large, red font.
            <div className="text-2xl text-red-500" > Error fetching user data </div>
        </div>
    )
}