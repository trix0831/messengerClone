"use client"

import { useDocument } from "@/hooks/useDocument";

type FriendMessageProps ={
    message:string;
}


export function FriendMessage( {message}: FriendMessageProps){
    const {setAnnouncement} = useDocument();

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        
    
        // Create a context menu
        const contextMenu = document.createElement('div');
        contextMenu.classList.add('context-menu');
        contextMenu.style.position = 'absolute';
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.backgroundColor = '#f1f1f1';
        contextMenu.style.borderRadius = '5px'; 
        contextMenu.style.border = '2px solid #ccc'; 
    
        // Create a delete option
        const deleteOption = document.createElement('div');
        deleteOption.innerText = 'Delete';
        deleteOption.classList.add('context-menu-option');
        deleteOption.addEventListener('click', () => {
            // Handle delete action
            // Set the display property to 'none' to make the message invisible
            alert("delete (sorry I didn't finish this function)");
        });
        deleteOption.style.borderBottom = '1px solid #ccc';
    
        const announceOption = document.createElement('div');
        announceOption.innerText = 'set announcement';
        announceOption.classList.add('context-menu-option');
        announceOption.addEventListener('click', () => {
            // Handle delete action
            // Set the display property to 'none' to make the message invisible
            setAnnouncement(message);
            // alert("announce");
        });
    
        // Append the delete option to the context menu
        contextMenu.appendChild(deleteOption);
        contextMenu.appendChild(announceOption);
    
        // Append the context menu to the document body
        document.body.appendChild(contextMenu);
    
        // Remove the context menu when clicking outside of it
        document.addEventListener('click', () => {
            if (contextMenu.parentNode) {
                contextMenu.parentNode.removeChild(contextMenu);
            }
        });
    };
    
    
    return(
        <>
            <div 
            className="w-fit bg-gray-500 rounded-2xl flex items-center mb-2"
            onContextMenu={(e) => handleContextMenu(e)
            }
            >
                <p className="m-2 text-semibold text-white">{message}</p>
            </div>
        </>
    );  
}

export default FriendMessage;