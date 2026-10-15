import { Link } from "react-router-dom"
import { MoveLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-5 bg-black text-white">
      <h2 className="text-6xl md:text-9xl font-bold text-center">NotFound</h2>
      <Link to='/' className="flex items-center gap-3 font-semibold"><MoveLeft/>Go back home</Link>
    </div>
  )
}

export default NotFound
