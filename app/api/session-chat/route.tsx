import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";
export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();
  try {
    const sessionId = uuidv4();
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId: sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toISOString(),
      })
      //@ts-ignore
      .returning({ SessionChatTable });
    return NextResponse.json(result[0]?.SessionChatTable);
  } catch (e) {
    return NextResponse.json(e);
  }
}

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const sessionId = searchParams.get("sessionId");
//   const user = await currentUser();

//   const result = await db
//     .select()
//     .from(SessionChatTable)
//     //@ts-ignore
//     .where(eq(SessionChatTable.sessionId, sessionId));

//   return NextResponse.json(result[0]);
// }

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const user = await currentUser();

    if (sessionId == "all") {
      const result = await db
        .select()
        .from(SessionChatTable)
        .where(
          eq(
            SessionChatTable.createdBy,
            user?.primaryEmailAddress?.emailAddress ?? ""
          )
        )
        .orderBy(desc(SessionChatTable.id));

      if (!result[0]) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result);
    } else {
      const result = await db
        .select()
        .from(SessionChatTable)
        .where(eq(SessionChatTable.sessionId, sessionId)); // ✅ eq now works

      if (!result[0]) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result[0]);
    }
  } catch (e) {
    console.error("Server error:", e); // 🔍 For debugging
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
