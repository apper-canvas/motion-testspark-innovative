import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import getIcon from '../utils/iconUtils'

const NotFound = () => {
  const navigate = useNavigate()
  const AlertTriangleIcon = getIcon('AlertTriangle')
  const HomeIcon = getIcon('Home')
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 mb-6 rounded-full bg-background-secondary flex items-center justify-center border border-error"
      >
        <AlertTriangleIcon className="text-error" size={40} />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-5xl font-heading mb-4 text-gradient"
      >
        404
      </motion.h1>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xl md:text-2xl font-heading mb-2 text-text-primary"
      >
        Page Not Found
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-text-secondary text-center max-w-md mb-8"
      >
        The page you're looking for doesn't exist or has been moved. Check the URL or return to the dashboard.
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="btn btn-primary flex items-center"
        onClick={() => navigate('/')}
      >
        <HomeIcon size={18} className="mr-2" />
        Back to Dashboard
      </motion.button>
    </div>
  )
}

export default NotFound