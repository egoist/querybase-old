import React, { useEffect, useMemo, useState } from "react"

export const useRouter = () => {
  const [path, setPath] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const handler = () => {
      const [path, search = ""] = (location.hash.slice(1) || "/").split("?")
      setPath(path)
      setSearch(search)
    }
    handler()
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])

  const query = useMemo(() => {
    const query = new URLSearchParams(search)
    return Object.fromEntries(query)
  }, [search])

  return {
    push(path: string, query?: Record<string, string>) {
      location.hash =
        path + (query ? "?" + new URLSearchParams(query).toString() : "")
    },
    path,
    query,
    search,
  }
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
