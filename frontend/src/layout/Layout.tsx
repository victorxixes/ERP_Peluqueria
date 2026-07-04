import { TopbarBlocks } from "../components/Sidebar";
import { TopbarBlocks } from "../components/TopbarBlocks";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex bg-slate-900 text-slate-200 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopbarBlocks />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

