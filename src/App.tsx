import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Archive from "./pages/Archive";
import EditProfile from "./pages/EditProfile";
import Hashtag from "./pages/Hashtag";
import BlockedUsers from "./pages/BlockedUsers";
import Leaderboard from "./pages/Leaderboard";
import { BottomNav } from "./components/layout/BottomNav";
import { Navbar } from "./components/layout/Navbar";

// for PWA
import { InstallBanner } from "./components/pwa/InstallBanner";
import { IOSInstallPrompt } from "./components/pwa/IOSInstallPrompt";

// socket
import { SocketProvider } from "./context/SocketContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Separate component to use hooks inside BrowserRouter
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Pages where we don't show nav
  const hideNav = [
    "/login",
    "/register",
    "/onboarding",
    "/",
    "/profile-setup",
  ].includes(location.pathname);

  return (
    <>
      {!hideNav && user && <Navbar />}
      {!hideNav && user && <BottomNav />}
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#fff",
                borderRadius: "12px",
              },
            }}
          />

          {/* Add both PWA prompts */}
          <InstallBanner />
          <IOSInstallPrompt />

          <AppLayout>
            <Routes>
              {/*Splash is now the entry point */}
              <Route path="/" element={<Splash />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile-setup"
                element={
                  <ProtectedRoute>
                    <ProfileSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <Saved />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <Explore />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/archive"
                element={
                  <ProtectedRoute>
                    <Archive />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hashtag/:tag"
                element={
                  <ProtectedRoute>
                    <Hashtag />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/blocked"
                element={
                  <ProtectedRoute>
                    <BlockedUsers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
