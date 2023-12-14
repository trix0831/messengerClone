import { eq } from "drizzle-orm";
import { db } from "@/db";
import { documentsTable, usersToDocumentsTable, chatTable } from "@/db/schema";


export const createDocument = async (userId: string, myname:string, friendName: string) => {
  "use server";
  console.log("[createDocument]");
  const defaultMes = "NOW you can chat with your friend !";
  const combinedTitle = `${myname} & ${friendName}`;

  const newDocId = await db.transaction(async (tx) => {
    const [newDoc] = await tx
      .insert(documentsTable)
      .values({
        title: combinedTitle,
        content: defaultMes,
        announcement: defaultMes,
        deleteCreater: false,
        deleteFriend: false,
      })
      .returning();

    await tx.insert(usersToDocumentsTable).values({
      userId: userId,
      documentId: newDoc.displayId,
      username: myname,
    });
    
    await tx.insert(chatTable).values({
      senderId: userId,
      documentId: newDoc.displayId,
      message: defaultMes,
    });

    return newDoc.displayId;
  });
  return newDocId;
};

export const getDocuments = async (userId: string) => {
  "use server";

  const documents = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.userId, userId),
    with: {
      document: {
        columns: {
          displayId: true,
          title: true,
          content: true,
          deleteCreater: true,
          deleteFriend: true,
          announcement: true,
        },
      },
    },
  });
  return documents;
};


export const deleteDocument = async (documentId: string) => {
  "use server";
  console.log("[deleteDocument]");
  await db
    .delete(documentsTable)
    .where(eq(documentsTable.displayId, documentId));

  // Also delete associated chat messages
  await db
    .delete(chatTable)
    .where(eq(chatTable.documentId, documentId));

  return;
};

export const getDocumentsByDocId = async (docId: string) => {
  "use server";

  const documents = await db.query.documentsTable.findMany({
    where: eq(documentsTable.displayId, docId),
    columns: {
      displayId: true,
      title: true,
      content: true,
      deleteCreater: true,
      deleteFriend: true,
      announcement: true,
    },
  });

  const document = documents[0];

  return document;
};