import { useGetMyQuestionSets } from "@hooks/useQuestionSet";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";
import { getCategoryStyle } from "@utils/categoryStyles";
import QuestionSetCard from "@components/MyPageQuestionSet/QuestionSetCard";
import QuestionItem from "@components/MyPageQuestionSet/QuestionItem";
import AddQuestionSetModal from "@components/MyPageQuestionSet/AddQuestionSetModal";
import AddQuestionModal from "@components/MyPageQuestionSet/AddQuestionModal";
import QuestionSetMenuModal from "@components/MyPageQuestionSet/QuestionSetMenuModal";

export default function MyQuestionSet() {
  const { data: questionSets } = useGetMyQuestionSets();
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isAddSetModalOpen, setIsAddSetModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isSetMenuModalOpen, setIsSetMenuModalOpen] = useState(false);
  const [selectedMenuSetId, setSelectedMenuSetId] = useState(null);

  const selectedSet = questionSets?.find((set) => set.id === selectedSetId);
  const selectedMenuSet = questionSets?.find(
    (set) => set.id === selectedMenuSetId,
  );

  const handleSetClick = (setId) => {
    setSelectedSetId(setId === selectedSetId ? null : setId);
    setSelectedQuestionId(null);
  };

  const handleQuestionClick = (questionId) => {
    setSelectedQuestionId(
      questionId === selectedQuestionId ? null : questionId,
    );
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
    console.log("Edit set:", selectedMenuSet);
    handleCloseMenu();
  };

  const handleDeleteSet = () => {
    console.log("Delete set:", selectedMenuSet);
    handleCloseMenu();
  };

  if (!questionSets) {
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
            <h2 className="font-bold text-2xl">내 면접 세트</h2>
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

        {selectedSet ? (
          <div className="flex w-[calc((100vw-256px)*0.6)] flex-1 flex-col overflow-hidden">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
              <h2 className="font-bold text-2xl">{selectedSet.title}</h2>
              <div className="flex gap-1">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={() => handleMenuClick(selectedSet.id)}
                >
                  <BsThreeDotsVertical size={16} />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={() => setIsAddQuestionModalOpen(true)}
                >
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
                    onClick={() => handleQuestionClick(question.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {isAddSetModalOpen && (
        <AddQuestionSetModal
          isOpen={isAddSetModalOpen}
          onClose={() => setIsAddSetModalOpen(false)}
          onOverlayClick={(e) =>
            handleOverlayClick(e, () => setIsAddSetModalOpen(false))
          }
        />
      )}

      {isAddQuestionModalOpen && (
        <AddQuestionModal
          isOpen={isAddQuestionModalOpen}
          onClose={() => setIsAddQuestionModalOpen(false)}
          onOverlayClick={(e) =>
            handleOverlayClick(e, () => setIsAddQuestionModalOpen(false))
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
