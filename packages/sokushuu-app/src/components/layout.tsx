const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen max-h-screen w-screen max-w-screen p-4 bg-zinc-100">{children}</div>;
};

export { Layout };
