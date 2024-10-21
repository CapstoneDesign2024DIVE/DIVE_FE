import QuestionSet from "@components/QuestionSet";
import SortButton from "@components/SortButton";

export default function QuestionSetPage() {
  return (
    <div className="p-4">
      <div className="mb-6 flex items-center">
        <h2 className="font-bold text-2xl">면접 질문 세트</h2>
        <SortButton className="ml-4" />
      </div>
      <div className="flex flex-wrap gap-4">
        <QuestionSet />
        <QuestionSet />
        <QuestionSet />
        <QuestionSet />
        <QuestionSet />
        <QuestionSet />
      </div>
    </div>
  );
}
