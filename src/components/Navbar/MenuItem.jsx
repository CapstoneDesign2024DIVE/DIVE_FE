import { FaCaretDown } from "react-icons/fa";
export default function MenuItem({ title, items, isOpen, onClick }) {
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
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {items.map((item, index) => (
          <button
            key={index}
            className="block w-full rounded-xl py-2 pl-4 text-left font-medium text-base hover:bg-gray-100"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
