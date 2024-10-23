import { useGetMyQuestionSets } from "@apis/questionSetAPI";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";
import { getCategoryStyle } from "@utils/categoryStyles";
import QuestionSetCard from "@components/MyPageQuestionSet/QuestionSetCard";
import QuestionItem from "@components/MyPageQuestionSet/QuestionSetItem";

export default function MyQuestionSet() {
  const { data: questionSets } = useGetMyQuestionSets();
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const selectedSet = questionSets?.find((set) => set.id === selectedSetId);

  return (
    <div className="flex h-[calc(100vh-48px)] w-full overflow-hidden">
      <div className="w-[calc((100vw-256px)*0.4)] flex-shrink-0">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
          <h2 className="font-bold text-2xl">내 면접 세트</h2>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
            <HiPlus size={20} />
          </button>
        </div>
        <div className="h-[calc(100vh-144px)] overflow-y-auto px-4">
          <div className="space-y-2">
            {questionSets?.map((set) => (
              <QuestionSetCard
                key={set.id}
                set={set}
                isSelected={set.id === selectedSetId}
                onClick={() => {
                  setSelectedSetId(set.id === selectedSetId ? null : set.id);
                  setSelectedQuestionId(null);
                }}
                getCategoryStyle={getCategoryStyle}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedSet ? (
        <div className="flex w-[calc((100vw-256px)*0.6)] flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
            <h2 className="font-bold text-2xl">{selectedSet.title}</h2>
            <div className="flex gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                <BsThreeDotsVertical size={16} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                <HiPlus size={20} />
              </button>
            </div>
          </div>
          <div className="h-[calc(100vh-144px)] overflow-y-auto px-4">
            <div className="space-y-2">
              {selectedSet.questions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  isSelected={selectedQuestionId === question.id}
                  onClick={() =>
                    setSelectedQuestionId(
                      selectedQuestionId === question.id ? null : question.id,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
