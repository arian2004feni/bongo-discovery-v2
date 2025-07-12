const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-xs flex items-center justify-center">
      <div className="flex flex-col items-center text-white space-y-4">
        <span className="loading loading-spinner w-16"></span>
        <p className="text-white text-sm opacity-80">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
