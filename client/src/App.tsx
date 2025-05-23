import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ModalWindow from "./components/ModalWindow";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContext";
import AuthRedirect from "./components/navigation/AuthRedirect";
import { ModalProvider } from "./contexts/ModalContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import NotFound from "./components/NotFound";
import DashboardAll from "./pages/dashboard/DashboardAll";
import DashboardStatistics from "./pages/dashboard/DashboardStatistics";
import Notifications from "./components/Notifications";

function App() {
  const { darkTheme } = useTheme();
  const { user } = useUser();
  return (
    <ModalProvider>
      <AuthRedirect />
      <Notifications />
      <div className={`main ${darkTheme ? "theme-dark" : ""}`}>
        <Routes>
          {user.role === "registered" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="all" element={<DashboardAll />} />
              <Route path="statistics" element={<DashboardStatistics />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          )}
          {user.role === "unregistered" && (
            <Route path="/welcome" element={<Welcome />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ModalWindow />
      </div>
    </ModalProvider>
  );
}

export default App;
