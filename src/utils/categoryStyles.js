export const getCategoryStyle = (category) => {
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
