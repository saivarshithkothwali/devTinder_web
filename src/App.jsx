import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Body from "./Body";
import NavBar from "./NavBar"; 

function App() {
  

  return (
    <div data-theme="dark" className="min-h-screen">
      
      <BrowserRouter basename="/">
        <Routes>
            <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
      
    
      
    </div>
  );
}

export default App;
