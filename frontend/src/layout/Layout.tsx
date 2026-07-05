import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-200">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};









