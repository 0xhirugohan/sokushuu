import { Sidebar } from "./layouts/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="h-screen max-h-screen w-screen max-w-screen p-4 bg-zinc-100 flex gap-4">
        <Sidebar styleName="flex-none" />
        <div className="flex justify-center items-center border-2 border-zinc-600 rounded-md w-full">
            {children}
        </div>
    </div>;
};

export { Layout };
