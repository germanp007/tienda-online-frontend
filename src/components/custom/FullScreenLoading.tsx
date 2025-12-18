
const FullScreenLoading = () => {
  return (
       <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="w-12 h-12 border-6 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      <p className="font-montserrat text-lg">Espere un momento...</p>
    </div>
  )
}

export default FullScreenLoading