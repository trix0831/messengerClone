import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, usersToDocumentsTable, chatTable } from "@/db/schema";

export async function getDocumentAuthors(docId: string) {
  const dbAuthors = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.documentId, docId),
    with: {
      user: {
        columns: {
          displayId: true,
          username: true,
          email: true,
        },
      },
    },
    columns: {},
  });

  const authors = dbAuthors.map((dbAuthor) => {
    const author = dbAuthor.user;
    return {
      id: author.displayId,
      username: author.username,
      email: author.email,
    };
  });

  return authors;
}


export async function getMessageOfDoc(docId: string) {
  const dbMessages = await db.query.chatTable.findMany({
    where: eq(chatTable.documentId, docId),
    columns: {
      id: true,
      documentId: true,
      message: true,
      senderId: true,
    },
  });

  const Messages = dbMessages.map((dbMessage) => {
    console.log(dbMessage);
    return {
      id: dbMessage.id,
      message: dbMessage.message,
      senderId: dbMessage.senderId,
    };
  });

  return Messages;
}

export const addDocumentAuthor = async (docId: string, friendname: string) => {
  // Find the user by email
  const [user] = await db
    .select({
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.username, friendname));

  await db.insert(usersToDocumentsTable).values({
    documentId: docId,
    userId: user.displayId,
    username: friendname,
  });
};

export const sendMessage = async (userId: string, documentId: string, message: string) => {
  "use server";
  console.log("[sendMessage]");

  await db.transaction(async (tx) => {
    await tx.insert(chatTable).values({
      senderId: userId,
      documentId: documentId,
      message: message,
    });
  });



  return;
};



export const userExisted = async (username: string) => {
  const [user] = await db
    .select({
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.username, username));

  if (!user) {
    return false;
  }
  else
    return true;
};
