import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import getIcon from '../utils/iconUtils'
import { toast } from 'react-toastify'

const Home = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "End-to-end tests for the shopping and checkout experiences",
      testCount: 24,
      passRate: 92,
      lastRun: "2 hours ago",
      status: "stable"
    },
    {
      id: 2,
      name: "Admin Dashboard",
      description: "User management and data visualization tests",
      testCount: 16,
      passRate: 81,
      lastRun: "1 day ago",
      status: "issues"
    },
    {
      id: 3,
      name: "Mobile API",
      description: "API endpoint tests for the mobile application",
      testCount: 38,
      passRate: 100,
      lastRun: "5 hours ago",
      status: "stable"
    }
  ])
  
  const LightningIcon = getIcon('Zap')
  const ArrowUpRightIcon = getIcon('ArrowUpRight')
  const BrainIcon = getIcon('Brain')
  const ClockIcon = getIcon('Clock')
  const CheckIcon = getIcon('CheckCircle2')
  const AlertCircleIcon = getIcon('AlertCircle')
  const MoreVerticalIcon = getIcon('MoreVertical')

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
    toast.success("Project deleted successfully")
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
            <span>Welcome to </span>
            <span className="text-gradient ml-2">TestSpark</span>
            <LightningIcon className="ml-2 text-primary animate-pulse" size={24} />
          </h1>
          <p className="text-text-secondary mb-4 max-w-2xl">
            Create, manage, and execute your test suites with AI assistance. Automate your testing workflow and integrate with your favorite tools.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary flex items-center">
            New Project <ArrowUpRightIcon className="ml-2" size={16} />
          </button>
        </div>
      </div>

      {/* Main feature section */}
      <div className="mb-12">
        <MainFeature />
      </div>

      {/* Projects list */}
      <div>
        <h2 className="text-2xl font-heading mb-4 flex items-center">
          Your Projects
          <BrainIcon className="ml-2 text-primary" size={20} />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="card hover:shadow-glow transition-all duration-300 group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-3 right-3 dropdown">
                <button className="p-1 text-text-secondary hover:text-text-primary">
                  <MoreVerticalIcon size={18} />
                </button>
                <div className="dropdown-content hidden group-hover:block absolute right-0 mt-2 w-48 bg-background-secondary rounded-lg shadow-lg z-10 border border-gray-700">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-text-secondary hover:bg-gray-700 hover:text-text-primary">Edit project</button>
                    <button className="block w-full text-left px-4 py-2 text-text-secondary hover:bg-gray-700 hover:text-text-primary">Duplicate project</button>
                    <button 
                      className="block w-full text-left px-4 py-2 text-error hover:bg-error/10"
                      onClick={() => deleteProject(project.id)}
                    >
                      Delete project
                    </button>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-text-secondary text-sm mb-4">{project.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-text-secondary text-sm">
                  <ClockIcon size={14} className="mr-1" />
                  <span>Last run: {project.lastRun}</span>
                </div>
                <div className={`badge ${project.status === 'stable' ? 'badge-success' : 'badge-warning'}`}>
                  {project.status === 'stable' ? (
                    <span className="flex items-center">
                      <CheckIcon size={12} className="mr-1" /> Stable
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <AlertCircleIcon size={12} className="mr-1" /> Issues
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
                <div>
                  <div className="text-sm text-text-secondary">Tests</div>
                  <div className="font-mono font-medium">{project.testCount}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Pass Rate</div>
                  <div className={`font-mono font-medium ${
                    project.passRate >= 90 ? 'text-success' : 
                    project.passRate >= 70 ? 'text-warning' : 
                    'text-error'
                  }`}>
                    {project.passRate}%
                  </div>
                </div>
                <button className="btn btn-outline py-1 px-3 text-sm">
                  Open
                </button>
              </div>
            </motion.div>
          ))}
          
          {/* Create new project card */}
          <motion.div
            className="card border-2 border-dashed border-gray-700 flex flex-col items-center justify-center py-8 hover:border-primary/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => toast.info("Create project modal would open here")}
          >
            <div className="w-12 h-12 rounded-full bg-background-primary flex items-center justify-center mb-3 border border-gray-700">
              <PlusIcon className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-medium mb-1">New Project</h3>
            <p className="text-text-secondary text-sm text-center max-w-xs">
              Create a new test project for your application
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Home

const PlusIcon = getIcon('Plus')