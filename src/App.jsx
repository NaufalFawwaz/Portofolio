import { Navbar, Home, AboutMe, Portofolio, Service } from "./components";
import { Route, Outlet, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";

function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
}

const App = () => {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route element={<ScrollTop />}>
              <Route path="/" element={<Home />}/>
              <Route path="/AboutMe" element={<AboutMe />}/>
              <Route path="/Portofolio" element={<Portofolio />}/>
              <Route path="/Service" element={<Service />}/>
            </Route>
          </Routes>
        </div>
      </div>
    </DarkModeProvider>
  )
}

export default App;