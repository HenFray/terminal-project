import React, { useState, useRef, useEffect } from 'react'
import Papa from 'papaparse'

interface Command {
  comando: string
  output: string
}

export default function Terminal() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [commands, setCommands] = useState<Command[]>([]) // Aquí guardaremos los comandos desde el CSV
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

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

  // Efecto para cargar el CSV cuando el componente se monta
  useEffect(() => {
    Papa.parse(`${process.env.PUBLIC_URL}/commands.csv`, {
      download: true,
      header: true,
      complete: (results) => {
        setCommands(results.data as Command[])
      }
    })    
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() !== '') {
      if (input.trim() === 'clear' || input.trim() === 'cls') {
        // Si el comando es "clear", limpiamos el output
        setOutput([])
      } else {
        // Buscamos el comando en el CSV
        const commandFound = commands.find(cmd => cmd.comando === input.trim())
        if (commandFound) {
          // Si encontramos el comando, mostramos el output del CSV
          setOutput([...output, `henfray@web-terminal:~$ ${input}`, commandFound.output])
        } else {
          // Si no se encuentra el comando, mostramos el mensaje de no reconocido
          setOutput([...output, `henfray@web-terminal:~$ ${input}`, `Comando '${input}' no reconocido.`])
        }
      }
      setInput('') // Limpiamos el input
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center">
        <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="favicon" />
          <div className="ml-4 text-white text-sm ">Terminal</div>
          <div className="flex space-x-3 justify-end">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>

        <div ref={terminalRef} className="p-4 h-96 overflow-y-auto font-mono text-sm text-left"> 
          {output.map((line, index) => (
            <div key={index} className="text-gray-300 mb-1" dangerouslySetInnerHTML={{ __html: line }}></div>
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
