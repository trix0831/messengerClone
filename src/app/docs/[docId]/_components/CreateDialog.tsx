import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createDocument } from "../../_components/actions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { addDocumentAuthor, userExisted} from "./actions";

async function CreateDialog() {
  const session = await auth();
  if (!session?.user?.id) return null;
  
  const userId = session.user.id;
  const myName = session.user.username;

  // const authors = await getDocumentAuthors(docId);
  // const mess = await getMessageOfDoc(docId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <svg width="32" height="32" className="hover:bg-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#1C274C"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z" fill="#1C274C"/>
        </svg>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new chat !</DialogTitle>
          <DialogDescription>Only CORRECT input can activate create function (input the name of existing user, else nothing happen)</DialogDescription>
        </DialogHeader>
        <form
          action={async (e) => {
            "use server";
            const friendName = e.get("username");

            if (!friendName) return;
            if (typeof friendName !== "string"){
              console.log("not a name");
              return;
            }

            if (friendName == myName){
              console.log("can't chat with yourself !");
              return;
            }

            if (typeof friendName == "string"){
                const result = await userExisted(friendName);
                if (!result) {
                  console.log("friend not found");
                  return;
                }
                else{
                  const newDocId = await createDocument(userId, myName, friendName);
                  revalidatePath("/docs");

                  await addDocumentAuthor(newDocId, friendName);
                  
                  redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${newDocId}`);
                }
              }
          }}
          className="flex flex-row gap-4"
        >
            <Input 
            placeholder="Please enter your friend's name (must be existing user)" 
            name="username" 
            />
        </form>
        {/* <div className="flex w-full flex-col gap-1">
          <h1 className="w-full font-semibold text-slate-900">Authors</h1>
          {authors.map((author, index) => (
            <form key={index} className="flex w-full items-center gap-2">
              <RxAvatar size={30} />
              <div className="flex grow flex-col ">
                <h2 className="text-sm font-semibold">{author.username}</h2>
                <p className="text-xs text-gray-600">{author.email}</p>
              </div>
            </form>
          ))}
        </div> */}
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
