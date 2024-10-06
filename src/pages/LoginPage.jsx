import { useState } from "react";
import { Link } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";
import naverLogo from "../assets/icons/naver.svg";
import kakaoLogo from "../assets/icons/kakao.svg";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <LandingNavbar />
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <form className="px-8 py-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>

            <div className="mb-3">
              <div className="flex justify-between items-center">
                <label
                  className="text-gray-700 text-sm font-bold mb-1.5"
                  htmlFor="username"
                >
                  아이디
                </label>
              </div>
              <input
                className="text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="username"
                name="username"
                type="text"
                placeholder="아이디"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center">
                <label
                  className="text-gray-700 text-sm font-bold mb-1.5"
                  htmlFor="password"
                >
                  비밀번호
                </label>
              </div>
              <input
                className="text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-center mb-1.5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
                type="submit"
              >
                로그인
              </button>
            </div>

            <div className="flex justify-between font-medium text-sm mb-2">
              <Link to="/find-account" className="text-gray-700">
                아이디/비밀번호 찾기
              </Link>
              <Link to="/signup" className="text-gray-700">
                회원가입
              </Link>
            </div>

            <div className="relative flex py-5 items-center font-medium">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">또는</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <button
                className="text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
                type="button"
                style={{ backgroundColor: "#03c75a" }}
              >
                <div className="flex items-center justify-center relative">
                  <img
                    src={naverLogo}
                    alt="Naver logo"
                    className="w-8 h-8 absolute left-0"
                  />
                  <span className="flex-grow text-center">
                    네이버로 시작하기
                  </span>
                </div>
              </button>
              <button
                className="font-bold py-2 px-4 rounded focus:outline-none w-full"
                type="button"
                style={{
                  backgroundColor: "#FEE500",
                }}
              >
                <div className="flex items-center justify-center relative">
                  <img
                    src={kakaoLogo}
                    alt="Kakao logo"
                    className="w-4 h-4 absolute left-2"
                  />
                  <span
                    style={{ color: "rgba(0, 0, 0, 0.85)" }}
                    className="flex-grow text-center"
                  >
                    카카오로 시작하기
                  </span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
