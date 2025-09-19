import React from "react"

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full min-h-[80px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
}
