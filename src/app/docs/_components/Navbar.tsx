import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import {getDocuments } from "./actions";

import CreateDialog from "../[docId]/_components/CreateDialog";
import Chatroom from "./Chatroom";


async function Navbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  const documents = await getDocuments(userId);

  return (
    <nav className="flex w-full flex-col bg-gray-100 pb-10 h-[100vh]">
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-slate-100 pb-2">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">
              Chat
            </h1>
          </div>

          <CreateDialog/>
        
        </div>

          <Chatroom documents={documents}/>
      </nav>
    </nav>
  );
}

export default Navbar;
