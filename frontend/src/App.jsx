import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from './pages/Home';
import About from './pages/About';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import {useAuthContext} from "./context/AuthContext";
import AddHotel from "./pages/AddHotel";

const App = () => {

  const {isLoggedIn} = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout component = {Home} />}></Route>
        <Route path = "/about" element={<Layout component={About} />}></Route>
        <Route path="/register" element={<Layout component={Signup} />}></Route>
        <Route path="/login" element={<Layout component={Signin} />}></Route>

        {isLoggedIn && 
        <>
          <Route path = "/add-hotel" element={<Layout component={AddHotel}></Layout>}></Route>
        </>
        }
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Router>
  );
};

export default App;