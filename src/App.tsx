import React from 'react'
import './App.css'

// import List from './pages/List/List'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'

function App() {
  return (
    <RouterProvider router={routerConfig}></RouterProvider>
  )
}

export default App

// import React from 'react'
// import './App.css'

// // import List from './pages/List/List'
// import { RouterProvider } from 'react-router-dom'
// import routerConfig from './router/index'

// function App() {
//   return <RouterProvider router={routerConfig}></RouterProvider>
// }

// export default App
