import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            throw new Error("User authentication failed");
        }

        let dbUser = await prisma.user.findUnique({
            where: { kindeId: user.id }
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    kindeId: user.id,
                    firstName: user.given_name ?? "",
                    lastName: user.family_name ?? "",
                    email: user.email ?? ""
                }
            });
        }

        return NextResponse.redirect(`http://127.0.0.1:3000/dashboard`);
    } catch (error: any) {
        // Log the error to the console
        console.error("Error processing request:", error);

        // Optionally send a more detailed error message to the client
        return NextResponse.json({ 
            error: 'Failed to process request', 
            details: error.message // Include the error message for debugging
        }, { status: 500 });
    }
}
