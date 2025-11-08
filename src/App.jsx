import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="App">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
      <Outlet />
    </div>
  )
}

export default App