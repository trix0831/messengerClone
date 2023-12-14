import { auth } from "@/lib/auth";
import SubInput from './SubInput'
import { sendMessage } from "./actions";

type MessageInputProps = {
  docID: string,
}

async function MessageInput({docID}:MessageInputProps) {
  const session = await auth();
  if (!session?.user?.id) return null;
  
  const userId = session.user.id;

  return (
    <>
        <svg width="32" height="32" className="m-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g>
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8zm2-8v4h4V5h-4zm0 10v4h4v-4h-4zM5 5v4h4V5H5zm0 10v4h4v-4H5z"/>
          </g>
        </svg>
    <form
        className="w-full"
        action={async (e) => {
            "use server";
            const newMessage = e.get("messageInput");
            
            if (typeof newMessage == "string" && newMessage != '')
              await sendMessage(userId, docID, newMessage);

          }}>

          <SubInput/>

    </form>
    </>
  );
}

export default MessageInput;
