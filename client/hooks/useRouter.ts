import React, { useEffect, useMemo, useState } from "react"

export const useRouter = () => {
  const [path, setPath] = useState("")

  useEffect(() => {
    const handler = () => {
      const path = location.hash.slice(1) || "/"
      setPath(path)
    }
    handler()
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])

  return useMemo(() => {
    return {
      push(path: string) {
        location.hash = path
      },
      path,
    }
  }, [path])
}

export const Router: React.FC<{
  routes: { path: string; element: JSX.Element }[]
}> = ({ routes }) => {
  const router = useRouter()

  const el = useMemo(() => {
    return routes.find((route) => route.path === router.path)?.element || null
  }, [router.path])

  return el
}
