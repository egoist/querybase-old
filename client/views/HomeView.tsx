import { useState } from "react"
import { useRouter } from "~/hooks/useRouter"

export const HomeView = () => {
  const [name, setName] = useState("postgres")
  const router = useRouter()

  const connect = async () => {
    await querybase.createConnection({ name: name })
    router.push(`/database`)
  }

  return (
    <div className="">
      <input
        placeholder="Database name"
        value={name}
        onChange={(e) => setName((e.target as any).value)}
      />
      <button onClick={connect}>Connect</button>
    </div>
  )
}
