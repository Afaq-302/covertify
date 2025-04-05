export default function ToolLayout({ title, description, emoji, children }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <div className="text-4xl mb-2">{emoji}</div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border p-6">{children}</div>
    </div>
  )
}

