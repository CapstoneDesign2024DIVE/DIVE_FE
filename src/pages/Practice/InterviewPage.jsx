import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";
import Modal from "@components/Modal";
import { useUploadVideo } from "@hooks/useVideo";
import useAuthStore from "@store/authStore";

export default function InterviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);
  const uploadVideoMutation = useUploadVideo();

  const { selectedSet, selectedQuestions, selectedDevices } =
    location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const currentQuestion = selectedQuestions?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === selectedQuestions.length - 1;

  const { userInfo } = useAuthStore();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.ondataavailable = null;
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
      chunksRef.current = [];
    }
  };

  const handleNextQuestion = () => {
    if (isRecording) {
      if (
        window.confirm(
          "녹화를 중단하고 다음 질문으로 넘어가시겠습니까? 현재 녹화 중인 영상은 저장되지 않습니다.",
        )
      ) {
        resetRecording();
        if (isLastQuestion) {
          setShowFinishModal(true);
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      }
    } else {
      if (isLastQuestion) {
        setShowFinishModal(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }
  };

  const handleFinish = () => {
    navigate("/");
  };

  const initializeStream = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedDevices.videoDeviceId
            ? { exact: selectedDevices.videoDeviceId }
            : undefined,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: {
          deviceId: selectedDevices.audioDeviceId
            ? { exact: selectedDevices.audioDeviceId }
            : undefined,
        },
      });

      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setIsReady(true);
      setError("");
    } catch (err) {
      setError("카메라/마이크 연결에 실패했습니다.");
      setIsReady(false);
      console.error(err);
    }
  };

  useEffect(() => {
    if (!selectedSet || !selectedQuestions) {
      navigate("/select-question");
      return;
    }
    initializeStream();

    return () => {
      stopTimer();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleExit = () => {
    if (isRecording) {
      if (
        window.confirm(
          "녹화를 중단하고 나가시겠습니까? 현재 녹화 중인 영상은 저장되지 않습니다.",
        )
      ) {
        resetRecording();
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const startRecording = () => {
    try {
      chunksRef.current = [];
      const options = {
        mimeType: "video/mp4",
      };

      if (!MediaRecorder.isTypeSupported("video/mp4")) {
        options.mimeType = "video/webm;codecs=h264";
        if (!MediaRecorder.isTypeSupported("video/webm;codecs=h264")) {
          options.mimeType = "video/webm";
        }
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          if (chunksRef.current.length > 0) {
            const videoBlob = new Blob(chunksRef.current, {
              type: "video/mp4",
            });

            setIsUploading(true);
            await uploadVideoMutation.mutateAsync({
              questionId: currentQuestion.id,
              isOpen: false,
              videoBlob,
            });
            setIsUploading(false);

            if (isLastQuestion) {
              setShowFinishModal(true);
            }
          }
        } catch (error) {
          setError("영상 업로드에 실패했습니다.");
          console.error("Upload failed:", error);
          setIsUploading(false);
        } finally {
          chunksRef.current = [];
        }
      };

      mediaRecorder.start(500);
      setIsRecording(true);
      startTimer();
    } catch (err) {
      setError("녹화 시작에 실패했습니다.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!selectedSet || !selectedQuestions) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-48px)] flex-col">
      <div className="relative flex-shrink-0 bg-white p-6 shadow">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-2 font-medium text-gray-500">
            질문 {currentQuestionIndex + 1}/{selectedQuestions.length}
          </h3>
          <p className="font-bold text-xl text-gray-900">
            {currentQuestion?.contents}
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">
        <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-xl">
          <div className="absolute right-4 top-4 z-10">
            <div className="flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 text-white backdrop-blur-sm">
              {isReady && !isRecording && !isUploading && (
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <span className="font-medium text-sm">녹화 준비중</span>
                </div>
              )}
              {isRecording && (
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500"></div>
                  <span className="font-medium text-sm">녹화중</span>
                  <span className="font-medium text-sm tabular-nums">
                    {formatTime(timer)}
                  </span>
                </div>
              )}
              {isUploading && (
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span className="font-medium text-sm">업로드중...</span>
                </div>
              )}
            </div>
          </div>

          {error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full scale-x-[-1] object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex-shrink-0 border-t bg-white p-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <button
            onClick={handleExit}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            <IoMdExit size={20} />
            나가기
          </button>
          <div className="flex gap-2">
            <button
              onClick={toggleRecording}
              disabled={!isReady || isUploading}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
                isRecording
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {isRecording ? <FiVideoOff size={20} /> : <FiVideo size={20} />}
              {isRecording ? "녹화 중지" : "녹화 시작"}
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={isUploading}
              className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentQuestionIndex === selectedQuestions.length - 1
                ? "면접 종료"
                : "다음 질문"}
              <HiArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        onConfirm={handleFinish}
        title="면접이 종료되었습니다"
      >
        <p>정말 수고하셨습니다🥳</p>
      </Modal>
    </div>
  );
}
