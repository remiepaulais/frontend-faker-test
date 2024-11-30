import { User } from '../types'

export const fetchUsers = async (count?: string): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users?count=${count}`
        )
        if (!res.ok) {
          reject('Failed to fetch users')
        }
        const data = await res.json()
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }, 1000)
  })
}
