"use client"

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type docType = {
  id : number, 
  userId : string, 
  documentId : string, 
  document : {
    title : string;
    displayId : string;
    announcement: string;
    content: string;
  };
}

type ChatroomProps = {
    documents : docType[],
}


export function Chatroom({documents} : ChatroomProps){
  const [text, setText] = useState(''); 

  const filteredDocuments = documents.filter(doc =>
    doc.document.title.toLowerCase().includes(text.toLowerCase())
  );

  const renderCount = filteredDocuments.length;

    return (
        <>
          <section className="w-11/12 relative flex justify-between items-center">
            <svg width="24" height="24" className="absolute ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.44 21.88C20.3399 21.88 21.88 20.3399 21.88 18.44C21.88 16.5401 20.3399 15 18.44 15C16.5401 15 15 16.5401 15 18.44C15 20.3399 16.5401 21.88 18.44 21.88Z" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23.0009 23L20.8809 20.88" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21.6201 12.8401C21.8732 12.086 22.0015 11.2955 22 10.5C22 5.81 17.52 2 12 2C6.48 2 2 5.81 2 10.5C2.02247 11.6688 2.30308 12.8182 2.82172 13.8658C3.34035 14.9135 4.0842 15.8335 5 16.5601V19.91C4.99971 20.3202 5.11953 20.7214 5.34467 21.0642C5.5698 21.407 5.89043 21.6765 6.26691 21.8392C6.64338 22.0019 7.05924 22.0508 7.4632 21.9799C7.86715 21.9089 8.24151 21.7213 8.54004 21.4401L11.15 18.9801H12.02" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          {/* <SearchBar/> */}
          <Input
            placeholder="search user ..."
            value={text}
            onChange={(e) => {setText(e.target.value)}}
            className="pl-10 m-2 bg-gray-300 border rounded-2xl hover:bg-gray-200"
            />
          
          </section>
      

      <section className="flex w-full flex-col pt-3">
      {documents.map((doc, i) => {
        // doc.document.title.includes(sp)
          if (doc.document.title.includes(text)) {
            return (
              <div
                key={i}
                className="group flex w-full cursor-pointer items-center justify-between gap-2 text-slate-400 hover:bg-slate-200 "
              >
                <Link
                  className="grow px-3 py-1"
                  href={`/docs/${doc.document.displayId}`}
                >
                  <div className="flex items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="9" r="3" stroke="#000000" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="1.5"/>
                      <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>

                    <div className="grid grid-row-2">
                      <span className="text-md font-semibold text-black">
                        {doc.document.title}
                      </span>
                      <span className="text-sm text-slate-400">
                        {doc.document.content}
                      </span>
                    </div>
                  </div>
                </Link>                
              </div>
            );
          }
        }
        )}

      {(renderCount == 0) && 
      <div className="grid grid-rows-2">
        <p className="ml-2">no user found</p>
        <p className="ml-2">create it from button above</p>
      </div>}

      </section>
      </>
    );
}

export default Chatroom;