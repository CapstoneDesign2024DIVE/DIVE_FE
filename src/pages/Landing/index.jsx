import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import InterviewImage from "@assets/images/interview.png";

export default function LandingPage() {
  const [showArrow, setShowArrow] = useState(true);
  const lastSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.8,
      },
    );

    if (lastSectionRef.current) {
      observer.observe(lastSectionRef.current);
    }

    return () => {
      if (lastSectionRef.current) {
        observer.unobserve(lastSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
      <main className="bg-[#F5F5F7]">
        <section
          className="flex h-screen snap-start flex-col justify-start bg-contain bg-right-bottom bg-no-repeat px-20 pt-32"
          style={{
            backgroundImage: `url(${InterviewImage})`,
            backgroundSize: "43% auto",
            backgroundPosition: "88% 88%",
          }}
        >
          <div className="mt-[7vh] font-bold text-6xl text-[#1D1D1F]">
            <h1 className="mb-4 ml-8">막막한 기술 면접,</h1>
            <h1 className="mb-4 ml-8">DIVE와 함께</h1>
            <h1 className="mb-4 ml-8">DEEP DIVE 해요!</h1>
          </div>
        </section>
        <section className="flex h-screen snap-start items-center justify-center">
          <h1 className="mb-7 font-bold text-3xl text-[#1D1D1F]">Second</h1>
        </section>
        <section className="flex h-screen snap-start items-center justify-center">
          <h1 className="mb-7 font-bold text-3xl text-[#1D1D1F]">Third</h1>
        </section>
        <section className="flex h-screen snap-start items-center justify-center">
          <h1 className="mb-7 font-bold text-3xl text-[#1D1D1F]">Fourth</h1>
        </section>
        <section
          ref={lastSectionRef}
          className="flex h-screen snap-start items-center justify-center"
        >
          <h1 className="mb-7 font-bold text-3xl text-[#1D1D1F]">Last</h1>
        </section>
        {showArrow && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 transform">
            <IoIosArrowDown
              size={48}
              className="animate-bounce text-gray-800"
            />
          </div>
        )}
      </main>
    </div>
  );
}
