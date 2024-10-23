import QuestionSet from "@components/QuestionSet";
import SortButton from "@components/SortButton";
import { useGetQuestionSets } from "@apis/questionSetAPI";
import useSortStore from "@store/store";

export default function QuestionSetPage() {
  const sortOrder = useSortStore((state) => state.sortOrder);
  const { data: questionSets } = useGetQuestionSets(sortOrder);

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-2xl">공개된 면접 세트</h2>
        <SortButton className="ml-4" />
      </div>
      <div className="flex flex-wrap gap-4">
        {questionSets
          ?.filter((set) => set.open)
          .map((questionSet) => (
            <QuestionSet key={questionSet.id} {...questionSet} />
          ))}
      </div>
    </div>
  );
}
