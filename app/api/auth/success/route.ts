import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
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

        return NextResponse.redirect(`https://main.d2q2f4v2d6ezrm.amplifyapp.com/dashboard`);
    } catch (error) {
        console.error('Error in authentication success:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}