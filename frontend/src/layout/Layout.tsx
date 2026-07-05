import { Sidebar } from "../components/Sidebar";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex bg-slate-900 text-slate-200 min-h-screen">
      
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido + topbar */}
      <div className="flex-1 flex flex-col">
        
        {/* Menú horizontal arriba */}
        <TopbarBlocks />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};


