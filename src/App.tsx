import { Route, Routes } from "react-router-dom"
import { publicRouter } from "./router"

function App() {


  return (
    <div>
      <Routes>
        {
          publicRouter.map((router)=>{
            const Page=router.element
            return <Route key={`${router.path}`} path={`${router.path}`} element={Page} />
          })
        }
      </Routes>
    </div>
  )
}

export default App
