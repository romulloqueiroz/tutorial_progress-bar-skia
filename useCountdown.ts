import { useState, useEffect } from 'react'

export const useCountdown = (totalTime: number) => {
  const [countdown, setCountdown] = useState<number>(totalTime)
  const [isPaused, setIsPaused] = useState<boolean>(true)

  useEffect(() => {
    if (countdown === 0 || isPaused) return

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown, isPaused])

  const toggle = () => setIsPaused((prevIsPaused) => !prevIsPaused)

  const reset = () => setCountdown(totalTime)

  return { countdown, toggle, isPaused, reset }
}
