import QuestionSet from "@components/QuestionSet";

export default function QuestionSetPage() {
  return (
    <div className="p-4">
      <div className="">
        <h2 className="mb-6 font-bold text-2xl">면접 질문 세트</h2>
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
