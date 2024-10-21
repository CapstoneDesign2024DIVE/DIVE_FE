import Navbar from "@components/Navbar";
import UserNavbar from "@components/UserNavbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <UserNavbar />
      {children}
    </>
  );
}
