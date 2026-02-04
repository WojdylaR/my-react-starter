import { useLocation } from "react-router-dom"

function useActivePage() {
  const { pathname } = useLocation()

  return (path: string) => pathname.split('/')[1] === path.split('/')[1]
}

export default useActivePage