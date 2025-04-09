import type React from 'react'

import SokushuuLogo from './assets/sokushuu.svg'

const App: React.FC = () => {
  return (
    <div className="bg-zinc-100 w-full min-h-screen">
      <div className="min-h-screen p-4 flex justify-center items-center">
        <div className="flex flex-col gap-y-24 text-center min-w-60 w-[60vw] lg:w-[40vw]">
          <div className="flex flex-col gap-y-8 items-center">
            <div className="flex items-center gap-x-4">
              <img src={SokushuuLogo} alt="Sokushuu" className="w-16 h-16 border-2 border-zinc-600 rounded-md" />
              <h2 className="text-3xl">Sokushuu.de</h2>
            </div>
            <p className="text-xl">Learning can be done anytime and anywhere.</p>
          </div>
          <div className="flex md:flex-row flex-col md:gap-x-4 gap-y-4">
            <input type="text" placeholder="vitalik@ethereum.org" className="flex-2 xl:flex-3 rounded-md p-2 border-2 border-zinc-600" />
            <button className="shrink-1 rounded-md p-2 bg-zinc-200">Register Waitlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
