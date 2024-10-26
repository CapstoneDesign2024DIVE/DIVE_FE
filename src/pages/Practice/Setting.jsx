import { useLocation } from "react-router-dom";

export default function SettingPage() {
  const location = useLocation();
  const { selectedSet, selectedQuestions } = location.state || {};

  console.log(selectedSet);
  console.log(selectedQuestions);

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-2xl">카메라/마이크 설정</h2>
      </div>
    </div>
  );
}
