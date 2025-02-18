'use client'
import Link from "next/link";
import { SignInButton , UserButton, SignedIn , SignedOut} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
export const Navigation = () => {
    const pathname = usePathname();
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-200">
            <Link href="/" className={pathname === "/" ? "font=bold mr-4" : "mr-4 text-blue-500"} >
                Home
            </Link>
            <Link href="/about" className={pathname === "/about" ? "font=bold mr-4" : "mr-4 text-blue-500"} >
                About
            </Link>
            <Link href="/forget-password" className={pathname === "/forget-password" ? "font=bold mr-4" : "mr-4 text-blue-500"} >
                Forget-Password
            </Link>
            <SignedOut>
            <SignInButton mode="modal"/>
            </SignedOut>
            <SignedIn>
            <UserButton/>
            </SignedIn>
            
     </nav>
    )
}