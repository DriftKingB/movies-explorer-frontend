import { useContext } from "react"
import { AuthContext } from "../hoc/AuthProvider"

export default function useResposeMessage(err) {
  const { signout } = useContext(AuthContext);

  err.code === 401 && signout();

  return (`Ошибка: ${err.message.toLowerCase()}`)
}