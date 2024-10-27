import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";

export default function SettingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSet, selectedQuestions } = location.state || {};
  const videoRef = useRef(null);

  const [devices, setDevices] = useState({
    videoDevices: [],
    audioDevices: [],
  });
  const [selectedDevices, setSelectedDevices] = useState({
    videoDeviceId: "",
    audioDeviceId: "",
  });
  const [stream, setStream] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getDevices = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput",
      );
      const audioDevices = devices.filter(
        (device) => device.kind === "audioinput",
      );

      setDevices({
        videoDevices,
        audioDevices,
      });

      if (videoDevices.length > 0 && audioDevices.length > 0) {
        setSelectedDevices({
          videoDeviceId: videoDevices[0].deviceId,
          audioDeviceId: audioDevices[0].deviceId,
        });
      }
    } catch (err) {
      setError("카메라/마이크 접근 권한이 필요합니다.");
      console.error(err);
    }
  };

  const getStream = async () => {
    try {
      setIsLoading(true);

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

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
      setError("");
    } catch (err) {
      setError("카메라/마이크 접근에 실패했습니다. 권한을 확인해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeviceChange = (type, deviceId) => {
    setSelectedDevices((prev) => ({
      ...prev,
      [type]: deviceId,
    }));
  };

  useEffect(() => {
    getDevices();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (selectedDevices.videoDeviceId || selectedDevices.audioDeviceId) {
      getStream();
    }
  }, [selectedDevices]);

  const handlePrevious = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    navigate(-1);
  };

  const handleNext = () => {
    navigate("/interview", {
      state: {
        selectedSet,
        selectedQuestions,
        selectedDevices,
        stream,
      },
    });
  };
  return (
    <>
      <div className="flex h-[calc(100vh-48px)] w-[calc(100vw-256px)] overflow-hidden">
        <div className="flex w-full flex-col overflow-hidden">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              >
                <IoMdArrowBack size={20} />
              </button>
              <h2 className="font-bold text-2xl">카메라/마이크 설정</h2>
            </div>
          </div>

          <div className="flex h-[calc(100vh-192px)] w-full items-center justify-center overflow-y-auto bg-gray-100">
            <div className="flex w-1/2 flex-col items-center space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-xl">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <span className="text-lg text-white">
                      카메라 연결 중...
                    </span>
                  </div>
                ) : error ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-900 p-4">
                    <span className="text-center text-lg text-red-500">
                      {error}
                    </span>
                    <button
                      onClick={getDevices}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      다시 시도
                    </button>
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

              <div className="flex w-full justify-center gap-4">
                <div className="w-full">
                  <label className="block font-medium text-sm text-gray-700">
                    카메라
                  </label>
                  <select
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedDevices.videoDeviceId}
                    onChange={(e) =>
                      handleDeviceChange("videoDeviceId", e.target.value)
                    }
                  >
                    {devices.videoDevices.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label ||
                          `카메라 ${device.deviceId.slice(0, 5)}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="block font-medium text-sm text-gray-700">
                    마이크
                  </label>
                  <select
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedDevices.audioDeviceId}
                    onChange={(e) =>
                      handleDeviceChange("audioDeviceId", e.target.value)
                    }
                  >
                    {devices.audioDevices.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label ||
                          `마이크 ${device.deviceId.slice(0, 5)}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t p-4">
            <button
              onClick={handleNext}
              disabled={!!error || isLoading}
              className={`rounded-lg px-4 py-2 text-white ${
                !error && !isLoading
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
