import useAuthStore from "@store/authStore";

export default function MyPage() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated || !userInfo) {
    return (
      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold text-2xl">마이페이지</h2>
        </div>
        <div className="space-y-4">
          <div className="h-32 w-32 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-2xl">마이페이지</h2>
      </div>
      <div className="space-y-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
          <img
            src={userInfo.profileImage}
            alt="프로필 이미지"
            className="h-32 w-32 rounded-full border-2 border-gray-200 object-cover"
          />
          <div className="mt-4 space-y-4 sm:mt-0">
            <div>
              <h3 className="font-bold text-lg text-gray-700">
                닉네임 : {userInfo.nickname}
              </h3>
            </div>
            <div>
              <p className="font-medium text-gray-600">
                이메일 : {userInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
