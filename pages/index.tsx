import Center from '@/components/Center'
import Sidebar from '@/components/Sidebar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      
      <main className='flex'>
        {/* sidebar */}
        <Sidebar />
        {/* center */}
        <Center />
      </main>

      <div> 
        {/* player */}
      </div>
    </div>
  )
}
