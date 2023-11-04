/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react"
import { UserType } from "../types"

// doing this to save time and share the context between the client and provider
const initialUserState: Partial<UserType> = {
  id: 0,
  name: "",
  email: "",
  schedule: [],
  reservations: [],
}

const UserContext = createContext({
  ...initialUserState,
  setUser: (_payload: Partial<UserType>) => {},
})

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({ ...initialUserState })

  const setUserHandler = (payload: Partial<UserType>) =>
    setUser({ ...user, ...payload })

  return (
    <UserContext.Provider value={{ ...user, setUser: setUserHandler }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, initialUserState }
export default UserProvider
