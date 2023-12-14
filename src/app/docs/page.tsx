import { BiError } from "react-icons/bi";
// import { useSearchParams } from "next/navigation";

function DocsPage() {
  // const params = useSearchParams();
  // console.log('params', params.get("search"));
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* <Navbar sp={(typeof searchParams == "string") ? searchParams : ""}/> */}
        <BiError className="text-yellow-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          Please select a friend to chat
        </p>
      </div>
    </div>
  );
}
export default DocsPage;
