import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json(
      { error: "User email not found" },
      { status: 400 }
    );
  }

  try {
    // Check if User Already Exist
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));
    // If User Not Found, Create New User
    if (users?.length == 0) {
      const result = await db
        .insert(usersTable)
        .values({
          name: user?.fullName ?? "",
          email: user.primaryEmailAddress.emailAddress,
          credits: 10,
        })
        .returning();
      return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
  } catch (e) {
    return NextResponse.json(e);
  }
}
