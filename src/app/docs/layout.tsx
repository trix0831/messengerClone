import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      {/* overflow-y-scroll for child to show scrollbar */}
      <nav className="w-7/12 flex-col border-r bg-slate-100 pb-10 grid grid-cols-2">
        <Sidebar/>
        <Navbar/>

      </nav>
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="w-full overflow-y-scroll">{children}</div>
    </main>
  );
}

export default DocsLayout;
