import Dashboard from "./Dashboard.tsx";
import {Suspense} from "react";

function App() {
  return (
      <Suspense fallback={null}>
          <Dashboard/>
      </Suspense>)
}

export default App
