import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";
import { LuCheck } from "react-icons/lu";
import { getCategoryStyle } from "@utils/categoryStyles";
import QuestionModal from "@components/QuestionModal";

export default function QuestionSetDetailPage() {
  const { state } = useLocation();
  const questionSet = state?.questionSet;
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const handleOverlayClick = (e, closeModal) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleQuestionClick = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId],
    );
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === questionSet.questions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(questionSet.questions.map((q) => q.id));
    }
  };

  const isAnyQuestionSelected = selectedQuestions.length > 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-8">
      <div className="my-8 flex-1">
        <div className="rounded-2xl bg-gray-100 p-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={questionSet.imageUrl}
                alt={`${questionSet.nickname}의 프로필`}
                className="h-10 w-10 rounded-full ring-1 ring-gray-200"
              />
              <span className="font-bold text-lg text-gray-900">
                {questionSet.nickname}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 font-medium text-gray-600">
                <FaLayerGroup /> {questionSet.refCount}
              </span>
            </div>
          </div>
          <div className="mx-2 mb-2 flex items-center gap-4">
            <h1 className="font-bold text-2xl">{questionSet.title}</h1>
            <span
              className={`rounded-md px-3 py-1 font-medium text-sm ${getCategoryStyle(
                questionSet.category,
              )}`}
            >
              {questionSet.category}
            </span>
          </div>

          <p className="mx-2 whitespace-pre-wrap rounded-lg font-medium text-gray-500">
            {questionSet.description}
          </p>
        </div>
        <div className="px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white"
              >
                {selectedQuestions.length === questionSet.questions.length && (
                  <LuCheck className="text-indigo-600" />
                )}
              </button>
              <h2 className="my-4 font-bold text-xl text-gray-900">
                질문 목록
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                className={`rounded-lg px-4 py-2 font-medium text-white transition-colors ${
                  isAnyQuestionSelected
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "cursor-not-allowed bg-gray-300"
                }`}
                onClick={() => {
                  if (isAnyQuestionSelected) {
                    console.log("면접 시작하기");
                  }
                }}
                disabled={!isAnyQuestionSelected}
              >
                면접 시작하기
              </button>
              <button
                className={`rounded-lg border px-4 py-2 font-medium transition-colors ${
                  isAnyQuestionSelected
                    ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                }`}
                onClick={() => {
                  if (isAnyQuestionSelected) {
                    setIsQuestionModalOpen(true);
                  }
                }}
                disabled={!isAnyQuestionSelected}
              >
                질문 가져오기
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {questionSet.questions?.map((question) => (
              <div
                key={question.id}
                className={`cursor-pointer rounded-lg border bg-white px-4 py-3 transition-colors ${
                  selectedQuestions.includes(question.id)
                    ? "border-indigo-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleQuestionClick(question.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${
                      selectedQuestions.includes(question.id)
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selectedQuestions.includes(question.id) && (
                      <LuCheck className="h-4 w-4" />
                    )}
                  </div>
                  <p className="font-medium text-gray-900">
                    {question.contents}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isQuestionModalOpen && (
        <QuestionModal
          isOpen={isQuestionModalOpen}
          onClose={() => setIsQuestionModalOpen(false)}
          onOverlayClick={(e) =>
            handleOverlayClick(e, () => setIsQuestionModalOpen(false))
          }
          selectedQuestions={selectedQuestions}
          fromId={questionSet.id}
        />
      )}
    </div>
  );
}
