import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'

import IndexPage from './pages/index'
import TestPage from './pages/test'

const router = createBrowserRouter([
  IndexPage,
  TestPage
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
