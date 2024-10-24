import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogin, useSocialLogin } from "@hooks/useUser";
import naverLogo from "@assets/icons/naver.svg";
import kakaoLogo from "@assets/icons/kakao.svg";

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();
  const socialLoginMutation = useSocialLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code) {
      const provider = state === "STATE_STRING" ? "naver" : "kakao";
      handleSocialLogin(code, provider);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginMutation.mutateAsync(formData);
      if (response.accessToken) {
        navigate("/home");
      } else {
        console.error("로그인 실패: 토큰을 받지 못했습니다");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleSocialLogin = async (code, provider) => {
    try {
      const response = await socialLoginMutation.mutateAsync({
        code,
        provider,
      });
      if (response.accessToken) {
        navigate("/home");
      } else {
        console.error("소셜 로그인 실패: 토큰을 받지 못했습니다");
      }
    } catch (error) {
      console.error("소셜 로그인 실패:", error);
    }
  };

  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${FRONTEND_URL}/login/oauth2/code/kakao`;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${FRONTEND_URL}/login/oauth2/code/naver`;

  return (
    <>
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-md">
          <form className="px-8 py-6" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-center font-bold text-2xl">로그인</h2>

            <div className="mb-3">
              <div className="flex items-center justify-between">
                <label
                  className="mb-1.5 font-bold text-sm text-gray-700"
                  htmlFor="username"
                >
                  아이디
                </label>
              </div>
              <input
                className="w-full appearance-none rounded border px-3 py-2 font-medium text-sm leading-tight text-gray-700 focus:outline-none"
                id="username"
                name="username"
                type="text"
                placeholder="아이디"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label
                  className="mb-1.5 font-bold text-sm text-gray-700"
                  htmlFor="password"
                >
                  비밀번호
                </label>
              </div>
              <input
                className="w-full appearance-none rounded border px-3 py-2 font-medium text-sm leading-tight text-gray-700 focus:outline-none"
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1.5 flex items-center justify-center">
              <button
                className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
                disabled={loginMutation.isLoading}
              >
                {loginMutation.isLoading ? "로그인 중..." : "로그인"}
              </button>
            </div>

            {loginMutation.isError && (
              <p className="mt-2 text-center text-red-500">
                {loginMutation.error.message || "로그인에 실패했습니다."}
              </p>
            )}

            <div className="mb-2 flex justify-between font-medium text-sm">
              <Link to="/find-account" className="text-gray-700">
                아이디/비밀번호 찾기
              </Link>
              <Link to="/signup" className="text-gray-700">
                회원가입
              </Link>
            </div>

            <div className="relative flex items-center py-5 font-medium">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 flex-shrink text-gray-400">또는</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <a
                href={naverLoginUrl}
                className="block w-full rounded px-4 py-2 text-center font-bold text-white focus:outline-none"
                style={{ backgroundColor: "#03c75a" }}
              >
                <div className="relative flex items-center justify-center">
                  <img
                    src={naverLogo}
                    alt="Naver logo"
                    className="absolute left-0 h-8 w-8"
                  />
                  <span className="flex-grow text-center">
                    네이버로 시작하기
                  </span>
                </div>
              </a>
              <a
                href={kakaoLoginUrl}
                className="block w-full rounded px-4 py-2 text-center font-bold focus:outline-none"
                style={{
                  backgroundColor: "#FEE500",
                }}
              >
                <div className="relative flex items-center justify-center">
                  <img
                    src={kakaoLogo}
                    alt="Kakao logo"
                    className="absolute left-2 h-4 w-4"
                  />
                  <span
                    style={{ color: "rgba(0, 0, 0, 0.85)" }}
                    className="flex-grow text-center"
                  >
                    카카오로 시작하기
                  </span>
                </div>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
