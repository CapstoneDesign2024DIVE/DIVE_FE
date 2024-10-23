import QuestionSet from "@components/QuestionSet";
import SortButton from "@components/SortButton";
import { useGetQuestionSets } from "@apis/questionSetAPI";
import useSortStore from "@store/store";
import { useSearchParams } from "react-router-dom";

export default function QuestionSetPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sortOrder = useSortStore((state) => state.sortOrder);
  const { data: questionSets } = useGetQuestionSets(sortOrder);

  const getCategoryStyle = (category) => {
    const styles = {
      Frontend: "bg-indigo-100 text-indigo-800",
      Backend: "bg-green-100 text-green-800",
      Android: "bg-red-100 text-red-800",
      iOS: "bg-amber-100 text-amber-800",
      DevOps: "bg-purple-100 text-purple-800",
      CS: "bg-orange-100 text-orange-800",
    };
    return styles[category] || "bg-gray-100 text-gray-800";
  };

  const filteredQuestionSets = questionSets
    ?.filter((set) => set.open)
    .filter((set) => {
      if (!category || category === "ALL") return true;
      return set.category === category;
    });

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-2xl">공개된 면접 세트</h2>
          {category && category !== "ALL" && (
            <span
              className={`rounded-md px-2 py-1 font-medium text-sm ${getCategoryStyle(category)}`}
            >
              {category}
            </span>
          )}
          <SortButton />
        </div>
      </div>
      <div className="flex flex-wrap justify-start gap-6">
        {filteredQuestionSets?.map((questionSet) => (
          <QuestionSet key={questionSet.id} {...questionSet} />
        ))}
      </div>
    </div>
  );
}
