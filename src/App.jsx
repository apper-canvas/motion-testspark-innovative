import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import getIcon from './utils/iconUtils'

// Pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Components
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const DashboardIcon = getIcon('LayoutDashboard')
  const TestCasesIcon = getIcon('FileCode2')
  const PlayIcon = getIcon('PlayCircle')
  const SettingsIcon = getIcon('Settings')
  const ChevronRightIcon = getIcon('ChevronRight')
  const ChevronLeftIcon = getIcon('ChevronLeft')
  const BrainIcon = getIcon('Brain')
  const FileIcon = getIcon('File')

  return (
    <motion.div
      className={`fixed left-0 top-0 z-30 h-full bg-background-secondary ${
        isOpen ? 'w-64' : 'w-16'
      } transition-width duration-300 ease-in-out flex flex-col shadow-md border-r border-gray-800`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {isOpen ? (
          <h1 className="text-xl font-heading font-bold text-white">
            <span className="text-primary">Test</span>
            <span>Spark</span>
          </h1>
        ) : (
          <span className="text-2xl font-bold text-primary">TS</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
        >
          {isOpen ? <ChevronLeftIcon className="text-text-secondary" /> : <ChevronRightIcon className="text-text-secondary" />}
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-text-primary rounded-lg hover:bg-gray-700 group border-l-4 border-primary"
            >
              <DashboardIcon className="flex-shrink-0 w-5 h-5 text-text-primary transition-all" />
              {isOpen && <span className="ml-3">Dashboard</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-text-secondary rounded-lg hover:bg-gray-700 group"
            >
              <FileIcon className="flex-shrink-0 w-5 h-5 text-text-secondary transition-all" />
              {isOpen && <span className="ml-3">Projects</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-text-secondary rounded-lg hover:bg-gray-700 group"
            >
              <TestCasesIcon className="flex-shrink-0 w-5 h-5 text-text-secondary transition-all" />
              {isOpen && <span className="ml-3">Test Cases</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-text-secondary rounded-lg hover:bg-gray-700 group"
            >
              <PlayIcon className="flex-shrink-0 w-5 h-5 text-text-secondary transition-all" />
              {isOpen && <span className="ml-3">Test Runs</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-text-secondary rounded-lg hover:bg-gray-700 group"
            >
              <BrainIcon className="flex-shrink-0 w-5 h-5 text-text-secondary transition-all" />
              {isOpen && <span className="ml-3">AI Studio</span>}
            </a>
          </li>
        </ul>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <a
          href="#"
          className="flex items-center p-2 text-text-secondary rounded-lg hover:bg-gray-700 group"
        >
          <SettingsIcon className="flex-shrink-0 w-5 h-5 text-text-secondary transition-all" />
          {isOpen && <span className="ml-3">Settings</span>}
        </a>
      </div>
    </motion.div>
  )
}

const Header = ({ isOpen }) => {
  const PlusIcon = getIcon('Plus')
  const SearchIcon = getIcon('Search')
  const BellIcon = getIcon('Bell')
  const UserIcon = getIcon('User')

  return (
    <header className={`fixed left-0 top-0 right-0 z-20 h-16 bg-background-primary shadow-md transition-all duration-300 ease-in-out ${
      isOpen ? 'ml-64' : 'ml-16'
    }`}>
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-text-primary font-heading text-xl hidden md:block">Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-background-secondary text-text-primary pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={18} />
          </div>
          
          <button className="p-2 bg-gradient-primary rounded-full shadow-glow hover:opacity-90 transition-opacity">
            <PlusIcon className="text-background-primary" size={18} />
          </button>
          
          <button className="relative p-2 text-text-secondary hover:text-text-primary">
            <BellIcon size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-secondary rounded-full"></span>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center">
            <UserIcon className="text-text-primary" size={16} />
          </div>
        </div>
      </div>
    </header>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary font-sans">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header isOpen={sidebarOpen} />
      
      <main className={`pt-24 pb-8 px-6 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-background-secondary text-text-primary rounded-lg shadow-glow-purple border border-gray-700"
      />
    </div>
  )
}

export default App