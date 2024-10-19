import React, { useState, useRef, useEffect } from 'react'

export default function TerminalLinux() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null) // Ref para controlar el scroll automático

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Efecto para hacer scroll al final automáticamente cuando se actualiza la salida
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() !== '') {
      if (input.trim() === 'clear') {
        // Si el comando es "clear", limpiamos el output
        setOutput([])
      } else {
        // Agrega el comando y la respuesta en el estado
        setOutput([...output, `henfray@web-terminal:~$ ${input}`, `Comando '${input}' no reconocido.`])
      }
      setInput('') // Limpia el input
    }
  }

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center">
          <div className="ml-4 text-white text-sm">henfray@web-terminal</div>
          {/* Contenedor de los tres botones a la derecha */}
          <div className="flex space-x-3 justify-end">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div ref={terminalRef} className="p-4 h-96 overflow-y-auto font-mono text-sm text-left"> 
          {output.map((line, index) => (
            <div key={index} className="text-gray-300 mb-1">
              {line.startsWith('henfray@web-terminal') ? (
                <span className="text-green-500">{line}</span> // Estilo para los comandos
              ) : (
                <span className="text-gray-300">{line}</span> // Estilo para la respuesta
              )}
            </div>
          ))}

          <form onSubmit={handleInputSubmit} className="mt-2 flex items-center">
            <span className="text-green-500 mr-2">henfray@web-terminal:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-grow bg-transparent text-white focus:outline-none"
              style={{ textAlign: 'left' }}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
