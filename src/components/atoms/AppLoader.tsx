import { Loader } from 'lucide-react'

export const AppLoader = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-12">
      <Loader size={32} className="text-blue-600 animate-spin mb-4" />
      <p className="text-gray-600">Loading articles...</p>
    </div>
  )
}
