import { useGetMyQuestionSets } from "@hooks/useQuestionSet";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryStyle } from "@utils/categoryStyles";
import QuestionSetCard from "@components/MyPageQuestionSet/QuestionSetCard";
import QuestionSetAddModal from "@components/MyPageQuestionSet/QuestionSetAddModal";
import QuestionItemAddModal from "@components/MyPageQuestionSet/QuestionItemAddModal";
import QuestionSetMenuModal from "@components/MyPageQuestionSet/QuestionSetMenuModal";
import QuestionItem from "@components/MyPageQuestionSet/QuestionItem";

export default function SelectQuestionPage() {
  const navigate = useNavigate();
  const { data: questionSets } = useGetMyQuestionSets();
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isAddSetModalOpen, setIsAddSetModalOpen] = useState(false);
  const [isQuestionItemAddModalOpen, setIsQuestionItemAddModalOpen] =
    useState(false);
  const [isSetMenuModalOpen, setIsSetMenuModalOpen] = useState(false);
  const [selectedMenuSetId, setSelectedMenuSetId] = useState(null);

  const selectedSet = questionSets?.find((set) => set.id === selectedSetId);
  const selectedMenuSet = questionSets?.find(
    (set) => set.id === selectedMenuSetId,
  );

  const handleSetClick = (setId) => {
    if (setId === selectedSetId) {
      setSelectedSetId(null);
      setSelectedQuestions([]);
    } else {
      setSelectedSetId(setId);
      setSelectedQuestions([]);
    }
  };

  const handleQuestionToggle = (questionId) => {
    setSelectedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const handleMenuClick = (setId) => {
    setSelectedMenuSetId(setId);
    setIsSetMenuModalOpen(true);
  };

  const handleCloseMenu = () => {
    setIsSetMenuModalOpen(false);
    setSelectedMenuSetId(null);
  };

  const handleOverlayClick = (e, closeModal) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleEditSet = () => {
    handleCloseMenu();
  };

  const handleDeleteSet = () => {
    handleCloseMenu();
  };

  const handleNext = () => {
    if (!selectedSet || selectedQuestions.length === 0) {
      alert("질문 세트와 최소 1개 이상의 질문을 선택해주세요.");
      return;
    }

    const selectedQuestionDetails = selectedSet.questions.filter((q) =>
      selectedQuestions.includes(q.id),
    );

    navigate("/setting", {
      state: {
        selectedSet,
        selectedQuestions: selectedQuestionDetails,
      },
    });
  };

  if (!questionSets) {
    return (
      <div className="flex h-[calc(100vh-48px)] w-full overflow-hidden">
        <div className="w-[calc((100vw-256px)*0.4)] flex-shrink-0">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
            <h2 className="font-bold text-2xl">면접 연습</h2>
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
              <HiPlus size={20} />
            </button>
          </div>
          <div className="h-[calc(100vh-144px)] overflow-y-auto px-4">
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full animate-pulse rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-6 w-24 rounded bg-gray-200"></div>
                  </div>
                  <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[calc(100vh-48px)] w-full overflow-hidden">
        <div className="w-[calc((100vw-256px)*0.4)] flex-shrink-0">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
            <h2 className="font-bold text-2xl">면접 질문 선택</h2>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => setIsAddSetModalOpen(true)}
            >
              <HiPlus size={20} />
            </button>
          </div>
          <div className="h-[calc(100vh-144px)] overflow-y-auto px-4">
            <div className="space-y-2">
              {questionSets.map((set) => (
                <QuestionSetCard
                  key={set.id}
                  set={set}
                  isSelected={set.id === selectedSetId}
                  onClick={() => handleSetClick(set.id)}
                  getCategoryStyle={getCategoryStyle}
                  onMenuClick={handleMenuClick}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-[calc((100vw-256px)*0.6)] flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
            <h2 className="font-bold text-2xl">
              {selectedSet ? selectedSet.title : "선택된 질문 목록"}
            </h2>
            {selectedSet && (
              <div className="flex gap-1">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={() => handleMenuClick(selectedSet.id)}
                >
                  <BsThreeDotsVertical size={16} />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={() => setIsQuestionItemAddModalOpen(true)}
                >
                  <HiPlus size={20} />
                </button>
              </div>
            )}
          </div>
          <div className="h-[calc(100vh-192px)] overflow-y-auto px-4">
            {selectedSet ? (
              <div className="space-y-2">
                {selectedSet.questions.map((question) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    selectedQuestions={selectedQuestions}
                    onToggleSelect={handleQuestionToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center font-medium text-gray-500">
                  면접 질문 세트를 선택해주세요
                </p>
              </div>
            )}
          </div>
          <div className="my-2 flex justify-end border-t p-4">
            <button
              onClick={handleNext}
              disabled={!selectedSet || selectedQuestions.length === 0}
              className={`rounded-lg px-4 py-2 text-white ${
                selectedSet && selectedQuestions.length > 0
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {isAddSetModalOpen && (
        <QuestionSetAddModal
          isOpen={isAddSetModalOpen}
          onClose={() => setIsAddSetModalOpen(false)}
          onOverlayClick={(e) =>
            handleOverlayClick(e, () => setIsAddSetModalOpen(false))
          }
        />
      )}

      {isQuestionItemAddModalOpen && (
        <QuestionItemAddModal
          isOpen={isQuestionItemAddModalOpen}
          onClose={() => setIsQuestionItemAddModalOpen(false)}
          onOverlayClick={(e) =>
            handleOverlayClick(e, () => setIsQuestionItemAddModalOpen(false))
          }
        />
      )}

      {isSetMenuModalOpen && selectedMenuSet && (
        <QuestionSetMenuModal
          isOpen={isSetMenuModalOpen}
          onClose={handleCloseMenu}
          set={selectedMenuSet}
          onEdit={handleEditSet}
          onDelete={handleDeleteSet}
          onOverlayClick={(e) => handleOverlayClick(e, handleCloseMenu)}
        />
      )}
    </>
  );
}
