export function FullScreenSpinner() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 bg-opacity-80">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
}