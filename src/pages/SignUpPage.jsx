import { useState } from "react";
import LandingNavbar from "../components/LandingNavbar";

export default function SignUpPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <form className="px-8 py-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>

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
                className="font-medium text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="username"
                name="username"
                type="text"
                placeholder="아이디"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center">
                <label
                  className="text-gray-700 text-sm font-bold mb-1.5"
                  htmlFor="password"
                >
                  비밀번호
                </label>
              </div>
              <input
                className="font-medium text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center">
                <label
                  className="text-gray-700 text-sm font-bold mb-1.5"
                  htmlFor="confirmPassword"
                >
                  비밀번호 확인
                </label>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
              <input
                className="font-medium text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center">
                <label
                  className="text-gray-700 text-sm font-bold mb-1.5"
                  htmlFor="phone"
                >
                  연락처
                </label>
                {errors.phone && (
                  <span className="text-red-500 text-xs">{errors.phone}</span>
                )}
              </div>
              <input
                className="font-medium text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="phone"
                name="phone"
                type="tel"
                placeholder="연락처"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center">
                <label
                  className="text-gray-700 text-sm font-bold mb-1.5"
                  htmlFor="email"
                >
                  이메일
                </label>
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
              </div>
              <input
                className="font-medium text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
                type="submit"
              >
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
