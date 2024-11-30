import { useEffect, useState } from 'react'
import { User } from './types'
import { fetchUsers } from './api/getUsers'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './components/ui/card'
import { Avatar, AvatarFallback } from './components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useParams } from 'react-router'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { count } = useParams()

  useEffect(() => {
    setIsLoading(true)
    const getUsers = async () => {
      let data: User[]
      try {
        data = await fetchUsers(count)
        setUsers(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch users', error)
        setIsLoading(false)
      }
    }
    getUsers()
  }, [count])

  if (isLoading) {
    return (
      <main className='flex items-center justify-center h-screen'>
        <h1 className='text-6xl font-bold'>Loading...</h1>
      </main>
    )
  }

  return (
    <main>
      <h1 className='text-4xl font-bold text-center py-8'>
        Frontend Faker Test
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {users.map((user, index) => (
          <Card key={`${index}-${user.name}`}>
            <CardHeader key={`${index}-${user.name}`}>
              <CardTitle className='text-xl font-bold flex justify-between items-center'>
                <h2>{`${user.name} ${user.lastName}`}</h2>
                <Avatar className='w-12 h-12 hover:scale-110 transition duration-500'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    <span className='text-foreground/50'>
                      {user.name.charAt(0)}
                    </span>
                  </AvatarFallback>
                </Avatar>
              </CardTitle>
              <CardContent>
                <p className='text-foreground/80'>{user.bio}</p>
              </CardContent>
              <CardFooter className='flex justify-between items-center flex-wrap gap-x-4 gap-y-2'>
                <p className='text-sm font-light text-foreground/50'>
                  {user.email}
                </p>
                <p className='text-sm font-light text-foreground/50'>
                  {user.phone}
                </p>
              </CardFooter>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  )
}

export default App
