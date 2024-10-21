import LandingNavbar from "@components/LandingNavbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
}
