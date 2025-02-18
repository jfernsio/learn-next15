/*
 * File: route.ts
 * Path: /app/users/route.ts
 * Description: API Route Handler for /users endpoint in Next.js 13+ App Router
 * This file handles HTTP requests for the /users path
 */

import { NextResponse } from 'next/server';

// Mock data - In real app, this would come from a database
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

// GET handler - Returns list of users
// Route: GET /api/users
export async function GET() {
    return NextResponse.json(users);
}

// POST handler - Creates a new user
// Route: POST /api/users
// Body: { name: string }
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newUser = {
            id: users.length + 1,
            name: body.name
        };
        users.push(newUser);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}