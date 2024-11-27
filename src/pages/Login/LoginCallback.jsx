import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useUser } from "@hooks/useUser";

export default function LoginCallback() {
  const { provider } = useParams();
  const location = useLocation();
  const { handleCallback } = useUser();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (code) {
        await handleCallback(provider, code, state);
      }
    };

    handleOAuthCallback();
  }, [location.search, provider, handleCallback]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 font-bold text-2xl">로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
