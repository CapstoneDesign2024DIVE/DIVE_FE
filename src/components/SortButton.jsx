import { useState, useEffect, useRef } from "react";
import { FaClock, FaCalendarPlus, FaFire } from "react-icons/fa";
import useSortStore from "@store/store";

export default function SortButton({ className, type = "questionSet" }) {
  const {
    questionSetSortOrder,
    videoSortOrder,
    setQuestionSetSortOrder,
    setVideoSortOrder,
  } = useSortStore();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOrder =
    type === "questionSet" ? questionSetSortOrder : videoSortOrder;
  const setSortOrder =
    type === "questionSet" ? setQuestionSetSortOrder : setVideoSortOrder;

  const options = [
    { label: "최신순", icon: FaClock, value: 0 },
    { label: "생성순", icon: FaCalendarPlus, value: 1 },
    { label: "인기순", icon: FaFire, value: 2 },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options[sortOrder];
  const Icon = selectedOption.icon;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="flex items-center space-x-1.5 rounded-full border border-gray-300 bg-white px-2 py-[3px] font-medium text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="h-3 w-3 text-gray-500" />
        <span>{selectedOption.label}</span>
      </button>

      {isOpen && (
        <div className="absolute left-1/2 z-10 mt-1 -translate-x-1/2 transform overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-0.5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option.label}
                className={`flex w-full items-center whitespace-nowrap px-3 py-1.5 text-left text-sm ${
                  sortOrder === option.value
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                } transition duration-150 ease-in-out`}
                role="menuitem"
                onClick={() => {
                  setSortOrder(option.value);
                  setIsOpen(false);
                }}
              >
                <option.icon
                  className={`mr-2 h-3 w-3 ${
                    sortOrder === option.value
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
