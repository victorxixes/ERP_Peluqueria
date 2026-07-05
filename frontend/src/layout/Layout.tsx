import { Sidebar } from "../components/Sidebar";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-200">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};






