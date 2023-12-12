import { Navbar, Home, Footer, AboutMe, Portofolio, Service} from "./components";
import { Route, Outlet, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
  const { pathName } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, {pathName});

  return <Outlet />
}

const App = () => {
  return (
   <div>
    <Navbar />
    <div>
      <Routes>
        <Route element={<ScrollTop />}>
          <Route path="/Home" element={<Home />}/>
          <Route path="/AboutMe" element={<AboutMe />}/>
        </Route>
      </Routes>
    </div>
    <Footer />
   </div>
  )
}

export default App
