
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Shared from "./pages/shared.js";
import Dashboard from "./pages/home.js";
import Calendar from "./pages/calendar.js";
import Stats from "./pages/stats.js";
import Tasks from "./pages/crud.js";
import Kanban from "./pages/kanban.js";
function App(){
  return(
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<Shared/>}>
<Route index element={<Dashboard />} />
<Route path="calendar" element={<Calendar />} />
<Route path="stats" element={<Stats />} />
<Route path="kanban" element={<Kanban />} />
<Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;

