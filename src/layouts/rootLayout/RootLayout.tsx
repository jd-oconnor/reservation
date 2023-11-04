import { useState } from "react"
import { Outlet } from "react-router-dom"
import UserProvider from "../../context/UserContext"
import { IClient, IProvider } from "../../types"

const RootLayout = () => {
  const [user, setUser] = useState<IClient | IProvider | null>(null)
  return (
    <UserProvider user={user} setUser={setUser}>
      <Outlet />
    </UserProvider>
  )
}

export default RootLayout
