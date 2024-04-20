import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Employee from "./components/employee/Employee";
import ChainOfCommand from "./components/ChainOfCommand";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/chain-of-command"
            element={<MainLayout>{<ChainOfCommand />}</MainLayout>}
          />
          <Route
            path="/Dashboard"
            element={<MainLayout>{<Dashboard />}</MainLayout>}
          />
          <Route
            path="/employee"
            element={<MainLayout>{<Employee />}</MainLayout>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
