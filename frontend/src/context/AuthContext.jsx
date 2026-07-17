import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        const { data } = await api.post(
            "/auth/login",
            {
                email,
                password,
            }
        );

        localStorage.setItem(
            "codeshelf_token",
            data.data.token
        );

        setUser(data.data.user);

        return data;
    };

    const register = async (
        name,
        email,
        password
    ) => {
        const { data } = await api.post(
            "/auth/register",
            {
                name,
                email,
                password,
            }
        );

        localStorage.setItem(
            "codeshelf_token",
            data.data.token
        );

        setUser(data.data.user);

        return data;
    };

    const logout = () => {
        localStorage.removeItem(
            "codeshelf_token"
        );

        setUser(null);
    };

    const fetchUser = async () => {
        try {
            const token =
                localStorage.getItem(
                    "codeshelf_token"
                );

            if (!token) {
                setLoading(false);
                return;
            }

            const { data } = await api.get(
                "/auth/me"
            );

            setUser(data.data);
        } catch {
            localStorage.removeItem(
                "codeshelf_token"
            );

            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                register,
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};