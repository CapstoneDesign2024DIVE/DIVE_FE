import Navbar from "@components/Navbar";
import UserNavbar from "@components/UserNavbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="absolute left-60 top-20">{children}</div>
    </>
  );
}
