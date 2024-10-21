export default function UserModal() {
  return (
    <div className="absolute right-0 mt-1 w-56 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
      <div className="text-md flex flex-col items-center py-2 font-medium text-gray-700 hover:text-gray-900">
        <div className="block w-full px-4 py-2 text-center hover:bg-gray-100">
          내 정보
        </div>
        <div className="block w-full px-4 py-2 text-center hover:bg-gray-100">
          내 영상
        </div>
        <div className="block w-full px-4 py-2 text-center hover:bg-gray-100">
          내 면접 세트
        </div>
        <div className="block w-full px-4 py-2 text-center hover:bg-gray-100">
          내 이력서 관리
        </div>
        <div className="block w-full px-4 py-2 text-center hover:bg-gray-100">
          플랜 업그레이드
        </div>
        <div className="block w-full px-4 py-2 text-center hover:bg-gray-100">
          로그아웃
        </div>
      </div>
    </div>
  );
}
