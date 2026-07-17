import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MySnippets from "./pages/MySnippets";
import CreateSnippet from "./pages/CreateSnippet";
import EditSnippet from "./pages/EditSnippet";
import Favorites from "./pages/Favorites";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
    return (
        <Routes>
            {/* Public Routes */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/snippets"
                    element={<MySnippets />}
                />

                <Route
                    path="/snippets/new"
                    element={<CreateSnippet />}
                />

                <Route
                    path="/snippets/:id/edit"
                    element={<EditSnippet />}
                />

                <Route
                    path="/favorites"
                    element={<Favorites />}
                />

                <Route
                    path="/explore"
                    element={<Explore />}
                />
            </Route>

            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
}