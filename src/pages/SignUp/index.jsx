import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, login, useUserInfo } from "@apis/userAPI";
import LandingNavbar from "@components/Landing/Navbar";

export default function SignUpPage() {
  const navigate = useNavigate();
  const signUpMutation = signUp();
  const loginMutation = login();
  const { refetch: refetchUserInfo } = useUserInfo();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7)
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: formatPhoneNumber(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    const phoneRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "올바른 연락처 형식이 아닙니다.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signUpMutation.mutateAsync(formData);

        const loginData = {
          username: formData.username,
          password: formData.password,
        };
        await loginMutation.mutateAsync(loginData);
        await refetchUserInfo();
        navigate("/home");
      } catch (error) {
        console.error("Sign up failed:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: error.message || "회원가입에 실패했습니다.",
        }));
      }
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-md">
          <form className="px-8 py-6" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-center font-bold text-2xl">회원가입</h2>

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

            <div className="mb-3">
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

            <div className="mb-3">
              <div className="flex items-center justify-between">
                <label
                  className="mb-1.5 font-bold text-sm text-gray-700"
                  htmlFor="confirmPassword"
                >
                  비밀번호 확인
                </label>
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
              <input
                className="w-full appearance-none rounded border px-3 py-2 font-medium text-sm leading-tight text-gray-700 focus:outline-none"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between">
                <label
                  className="mb-1.5 font-bold text-sm text-gray-700"
                  htmlFor="phone"
                >
                  연락처
                </label>
                {errors.phone && (
                  <span className="text-xs text-red-500">{errors.phone}</span>
                )}
              </div>
              <input
                className="w-full appearance-none rounded border px-3 py-2 font-medium text-sm leading-tight text-gray-700 focus:outline-none"
                id="phone"
                name="phone"
                type="tel"
                placeholder="연락처"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label
                  className="mb-1.5 font-bold text-sm text-gray-700"
                  htmlFor="email"
                >
                  이메일
                </label>
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email}</span>
                )}
              </div>
              <input
                className="w-full appearance-none rounded border px-3 py-2 font-medium text-sm leading-tight text-gray-700 focus:outline-none"
                id="email"
                name="email"
                type="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
                disabled={signUpMutation.isLoading || loginMutation.isLoading}
              >
                {signUpMutation.isLoading || loginMutation.isLoading
                  ? "처리 중..."
                  : "가입하기"}
              </button>
            </div>

            {errors.form && (
              <p className="mt-2 text-center text-red-500">{errors.form}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
