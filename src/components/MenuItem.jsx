import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";

export default function MenuItem({
  title,
  items,
  isOpen,
  onClick,
  onItemClick,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    onItemClick?.(index);
  };

  return (
    <div className="my-2 pl-4">
      <button
        className="flex w-full items-center justify-between rounded-xl font-medium text-lg"
        onClick={onClick}
      >
        <span>{title}</span>
        <FaCaretDown
          className={`transition-transform duration-500 ${
            isOpen ? "rotate-180 transform" : ""
          }`}
          size={16}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "mt-2 max-h-96" : "max-h-0"
        }`}
      >
        {items.map((item, index) => (
          <button
            key={index}
            className={`block w-full rounded-xl py-2 pl-4 text-left font-medium text-base ${
              selectedIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
