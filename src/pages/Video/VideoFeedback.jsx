const VideoFeedback = ({ feedback }) => {
  if (!feedback || !feedback.contents) {
    return null;
  }

  const parseMarkdown = (text) => {
    return text.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="mb-2 mt-4 font-bold text-xl text-gray-900">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="mb-2 mt-3 text-lg font-semibold text-gray-800"
          >
            {line.substring(4)}
          </h3>
        );
      }

      if (line.trim() === "---") {
        return <hr key={index} className="my-4 border-gray-200" />;
      }

      if (line.trim().startsWith("- ")) {
        return (
          <li key={index} className="ml-4 text-gray-700">
            {line.substring(2)}
          </li>
        );
      }

      if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <p key={index} className="my-1 text-gray-700">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
            )}
          </p>
        );
      }

      if (line.trim()) {
        return (
          <p key={index} className="my-1 text-gray-700">
            {line}
          </p>
        );
      }

      return null;
    });
  };

  return (
    <div className="mb-6 mt-6">
      <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            AI 면접 피드백
          </h3>
          <p className="text-sm text-gray-500">인공지능이 분석한 답변 개선점</p>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400" />
          <div className="pl-6">{parseMarkdown(feedback.contents)}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoFeedback;
