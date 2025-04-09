import type React from 'react'
import { useState } from 'react'

import SokushuuLogo from './assets/sokushuu.svg'
import LoadingIcon from './assets/loading.svg'
import CheckIcon from './assets/check.svg'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (emailInput: string) => {
    return emailInput.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const postEmail = async (email: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/email/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Failed to post email')
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const isValid = validateEmail(email);
    if (!isValid) {
      setIsLoading(false)
      setError('Invalid email format, please use a valid email address. for example: vitalik@ethereum.org')
      return
    }

    try {
      await postEmail(email)
      setIsSubmitted(true)
      setIsLoading(false)
    } catch (error) {
      setError('Failed to post email')
      setIsLoading(false)
    }
  }

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
          <div className="flex flex-col gap-y-8">
            <div className="flex md:flex-row flex-col md:gap-x-4 gap-y-4">
              <input onChange={handleInputChange} onKeyUp={handleInputEnter} type="text" placeholder="vitalik@ethereum.org" className="flex-2 xl:flex-3 rounded-md p-2 border-2 border-zinc-600" disabled={isSubmitted} />
              <button onClick={handleSubmit} type="submit" className="shrink-1 min-w-20 rounded-md p-2 bg-zinc-100 border-2 border-zinc-600 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-60 shadow-lg">
                {isLoading ? (
                  <>
                    <img src={LoadingIcon} alt="Loading" className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {isSubmitted ? (
                      <span className="text-sm flex items-center gap-x-2">
                        Done
                        <img src={CheckIcon} alt="Check" className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-sm">Register Waitlist</span>
                    )}
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
