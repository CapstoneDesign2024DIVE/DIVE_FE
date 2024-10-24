import { useGetUserInfo } from "@hooks/useUser";

export default function MyPage() {
  const { data: user, isLoading } = useGetUserInfo();

  if (isLoading || !user) {
    return (
      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold text-2xl">마이페이지</h2>
        </div>
        <div className="space-y-4">
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
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg text-gray-700">{user.nickname}</h3>
        </div>
        <div>
          <p className="font-medium text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
