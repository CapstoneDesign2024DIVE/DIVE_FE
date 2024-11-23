import Navbar from "@components/Navbar";
import UserNavbar from "@components/UserNavbar";

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 z-40 w-60">
        <Navbar />
      </div>
      <div className="fixed left-60 right-0 top-0 z-40">
        <UserNavbar />
      </div>
      <div className="ml-60 mt-12 flex-1">{children}</div>
    </div>
  );
}
