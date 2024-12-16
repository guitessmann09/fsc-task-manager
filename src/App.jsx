import Sidebar from './components/Sidebar.jsx'
import Tasks from './components/Tasks.jsx'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
      <Toaster
        toastOptions={{
          style: {
            color: '#35383E',
          },
        }}
      />
    </div>
  )
}

export default App
