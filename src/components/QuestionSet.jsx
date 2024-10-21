import { FaLayerGroup } from "react-icons/fa";

export default function QuestionSet() {
  return (
    <div className="w-[360px] overflow-hidden rounded-lg border border-gray-200 p-4 shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-gray-300 hover:bg-gray-50 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://png.pngtree.com/png-vector/20240204/ourlarge/pngtree-portrait-photo-in-black-png-image_11610529.png"
            alt=""
            className="h-7 w-7 rounded-full ring-1 ring-gray-100 transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-indigo-200"
          />
          <div className="font-medium text-sm transition-colors duration-300 ease-in-out group-hover:text-gray-900">
            테스트닉네임
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaLayerGroup className="text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-indigo-500" />
          <span className="font-medium text-sm transition-colors duration-300 ease-in-out group-hover:text-gray-900">
            5
          </span>
        </div>
      </div>
      <h2 className="mb-2 truncate font-bold text-lg transition-colors duration-300 ease-in-out group-hover:text-indigo-600">
        이것만 보면 FE 면접왕
      </h2>
      <p className="line-clamp-2 font-medium text-sm text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-gray-700">
        프론트엔드 관련 면접 질문 세트입니다! 질문 세트입니다!
      </p>
    </div>
  );
}
