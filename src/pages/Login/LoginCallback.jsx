import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@hooks/useUser";

export default function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleCallback } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      navigate("/login");
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);

    const provider = window.location.pathname.split("/")[2];

    handleCallback(provider, code, state)
      .catch((error) => {
        console.error("Social login callback failed:", error);
        navigate("/login");
      })
      .finally(() => setIsProcessing(false));
  }, [navigate, handleCallback, searchParams, isProcessing]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 font-bold text-2xl">로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
