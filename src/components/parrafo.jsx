import { useState } from 'react'

function Parrafo({ children: texto = '' }) {
  const [mostrarMas, setMostrarMas] = useState(false)

  const textoCorto = texto.slice(0, 70)
  const textoCompleto = texto

  const toggleMostrarMas = () => {
    setMostrarMas(!mostrarMas)
  }

  return (
    <div className=''>
      <p>
        {mostrarMas
          ? textoCompleto
          : textoCorto.length >= 70
          ? textoCorto + '... '
          : textoCorto}
        <span>
          {texto.length > 70 && (
            <button
              onClick={toggleMostrarMas}
              className='text-gray-400 font-bold gap-2'
            >
              {mostrarMas ? 'mostrar menos' : 'mostrar más'}
            </button>
          )}
        </span>
      </p>
    </div>
  )
}

export default Parrafo
