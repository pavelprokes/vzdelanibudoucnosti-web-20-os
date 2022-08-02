import React from "react"
import { useSession } from "next-auth/react"

// https://next-auth.js.org/getting-started/client
export const Auth = ({ children }: Props) => {
  const { data: session } = useSession({ required: true })
  const isUser = !!session?.user

  if (isUser) {
    return <>{children}</>
  }

  return <div>My super new loading...</div>
}

interface Props {
  children: React.ReactNode
}
