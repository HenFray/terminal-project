import React, { useState, useRef, useEffect } from 'react'

export default function TerminalLinux() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() !== '') {
      setOutput([...output, `$ ${input}`, `Comando '${input}' no reconocido.`])
      setInput('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-900 px-4 py-2 flex items-center">
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-4 text-white text-sm">henfray@web-terminal</div>
        </div>
        <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
          {output.map((line, index) => (
            <div key={index} className="text-gray-300">
              {line}
            </div>
          ))}
          <form onSubmit={handleInputSubmit} className="mt-2 flex items-center">
            <span className="text-green-500 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-grow bg-transparent text-white focus:outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  )
}