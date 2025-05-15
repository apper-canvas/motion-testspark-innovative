import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import getIcon from '../utils/iconUtils'

const MainFeature = () => {
  const [recordingUrl, setRecordingUrl] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordedSteps, setRecordedSteps] = useState([])
  const [recordingName, setRecordingName] = useState('')
  const [activeView, setActiveView] = useState('recorder') // 'recorder' or 'steps'

  // Define icons at the top
  const PlayIcon = getIcon('Play')
  const StopCircleIcon = getIcon('StopCircle')
  const MousePointerIcon = getIcon('MousePointer')
  const KeyboardIcon = getIcon('Keyboard')
  const EyeIcon = getIcon('Eye')
  const BrainIcon = getIcon('Brain')
  const CheckIcon = getIcon('Check')
  const TrashIcon = getIcon('Trash')
  const ArrowUpRightIcon = getIcon('ArrowUpRight')

  const handleUrlChange = (e) => {
    setRecordingUrl(e.target.value)
  }
  
  const handleRecordingNameChange = (e) => {
    setRecordingName(e.target.value)
  }

  const toggleRecording = () => {
    if (!isRecording) {
      if (!recordingUrl) {
        toast.error("Please enter a URL to record")
        return
      }
      
      if (!recordingName) {
        toast.error("Please enter a name for this recording")
        return
      }
      
      // Start recording
      setIsRecording(true)
      toast.info("Recording started")
      
      // Simulate recording steps
      const demoSteps = [
        { id: 1, type: 'navigation', target: recordingUrl, description: 'Navigate to URL' },
        { id: 2, type: 'click', target: '.login-button', description: 'Click on Login button' },
        { id: 3, type: 'input', target: '#username', value: 'testuser', description: 'Enter username' },
        { id: 4, type: 'input', target: '#password', value: '********', description: 'Enter password' },
        { id: 5, type: 'click', target: 'button[type="submit"]', description: 'Click Submit' },
        { id: 6, type: 'assertion', target: '.welcome-message', expected: 'Welcome back', description: 'Assert welcome message' }
      ]
      
      // Add steps one by one with delays to simulate real recording
      let stepIndex = 0
      const stepInterval = setInterval(() => {
        if (stepIndex < demoSteps.length) {
          setRecordedSteps(prev => [...prev, demoSteps[stepIndex]])
          stepIndex++
        } else {
          clearInterval(stepInterval)
        }
      }, 1500)
    } else {
      // Stop recording
      setIsRecording(false)
      toast.success("Recording completed")
      setActiveView('steps')
    }
  }
  
  const deleteStep = (id) => {
    setRecordedSteps(recordedSteps.filter(step => step.id !== id))
    toast.info("Step removed")
  }
  
  const generateAITest = () => {
    toast.success("AI generated test case created", {
      icon: <BrainIcon className="text-primary" />
    })
    // In a real app, this would call an API to generate a test case
  }
  
  const saveRecording = () => {
    if (recordedSteps.length === 0) {
      toast.error("No steps to save")
      return
    }
    
    toast.success(`Recording "${recordingName}" saved successfully`)
    // Reset form for a new recording
    setRecordingUrl('')
    setRecordingName('')
    setRecordedSteps([])
    setActiveView('recorder')
  }

  // Step type icon mapping
  const getStepTypeIcon = (type) => {
    switch (type) {
      case 'click':
        return <MousePointerIcon className="text-primary" size={16} />
      case 'input':
        return <KeyboardIcon className="text-secondary" size={16} />
      case 'assertion':
        return <EyeIcon className="text-warning" size={16} />
      case 'navigation':
        return <ArrowUpRightIcon className="text-accent" size={16} />
      default:
        return <div className="w-4 h-4" />
    }
  }

  return (
    <motion.div 
      className="card border border-gray-700 overflow-hidden bg-background-secondary/70 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <BrainIcon className="text-primary" size={20} />
          </div>
          <h2 className="text-xl font-heading">
            {activeView === 'recorder' ? 'Test Recorder' : 'Recorded Steps'}
          </h2>
        </div>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-lg text-sm ${activeView === 'recorder' ? 'bg-gray-700 text-text-primary' : 'text-text-secondary hover:bg-gray-700'}`}
            onClick={() => setActiveView('recorder')}
          >
            Recorder
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${activeView === 'steps' ? 'bg-gray-700 text-text-primary' : 'text-text-secondary hover:bg-gray-700'}`}
            onClick={() => setActiveView('steps')}
            disabled={recordedSteps.length === 0}
          >
            Steps{recordedSteps.length > 0 && ` (${recordedSteps.length})`}
          </button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {activeView === 'recorder' ? (
          <motion.div
            key="recorder"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-text-secondary mb-2 text-sm">Recording Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g., Login Flow Test"
                    value={recordingName}
                    onChange={handleRecordingNameChange}
                    disabled={isRecording}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-text-secondary mb-2 text-sm">URL to Record</label>
                  <input
                    type="url"
                    className="input w-full"
                    placeholder="https://your-application.com"
                    value={recordingUrl}
                    onChange={handleUrlChange}
                    disabled={isRecording}
                  />
                </div>
                
                <button
                  className={`btn w-full ${isRecording ? 'bg-error hover:bg-error/90' : 'btn-primary'} flex items-center justify-center`}
                  onClick={toggleRecording}
                >
                  {isRecording ? (
                    <>
                      <StopCircleIcon size={18} className="mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <PlayIcon size={18} className="mr-2" />
                      Start Recording
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative flex flex-col">
                <div className="relative h-[250px] md:h-full min-h-[200px] bg-background-primary rounded-lg overflow-hidden border border-gray-700 p-4 flex flex-col items-center justify-center">
                  {isRecording ? (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-error animate-pulse" />
                          <span className="text-xs text-text-secondary">Recording in progress</span>
                        </div>
                      </div>
                      <div className="flex-grow w-full flex flex-col items-center justify-center space-y-6 mt-8">
                        <div className="text-text-secondary text-center">
                          {recordedSteps.length > 0 ? (
                            <div className="flex items-center text-success space-x-2">
                              <CheckIcon size={16} />
                              <span>{recordedSteps.length} steps recorded</span>
                            </div>
                          ) : (
                            "Waiting for browser interactions..."
                          )}
                        </div>
                        {recordedSteps.length > 0 && (
                          <div className="text-xs text-text-secondary">
                            Latest: <span className="text-primary">{recordedSteps[recordedSteps.length - 1]?.description}</span>
                          </div>
                        )}
                        <div className="animate-pulse text-primary font-mono text-xs">
                          Recording {recordingUrl}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img 
                        src="https://cdn.pixabay.com/photo/2022/05/08/03/10/browser-7181937_1280.png" 
                        alt="Browser illustration" 
                        className="w-24 h-24 mb-4 opacity-40"
                      />
                      <p className="text-text-secondary text-center">
                        Enter a URL and click "Start Recording" to begin capturing test steps
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="steps"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4 p-3 bg-background-primary rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{recordingName}</h3>
                  <p className="text-sm text-text-secondary">{recordingUrl}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="btn btn-outline py-1 px-3 text-sm flex items-center"
                    onClick={generateAITest}
                  >
                    <BrainIcon size={14} className="mr-1" />
                    Generate AI Test
                  </button>
                  <button 
                    className="btn btn-primary py-1 px-3 text-sm flex items-center"
                    onClick={saveRecording}
                  >
                    <CheckIcon size={14} className="mr-1" />
                    Save Recording
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {recordedSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="p-3 bg-background-primary rounded-lg border border-gray-700 flex items-center justify-between group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center">
                      {getStepTypeIcon(step.type)}
                    </div>
                    <div>
                      <div className="font-medium">{step.description}</div>
                      <div className="flex space-x-2 text-xs">
                        <span className="text-text-secondary">{step.type}</span>
                        {step.target && (
                          <span className="font-mono text-accent">{step.target}</span>
                        )}
                        {step.value && (
                          <span className="font-mono text-primary">"{step.value}"</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-error"
                    onClick={() => deleteStep(step.id)}
                  >
                    <TrashIcon size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MainFeature