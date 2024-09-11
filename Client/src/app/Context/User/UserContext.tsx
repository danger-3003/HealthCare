import { createContext, useState, useContext } from "react";

interface UserContextType {
    value: string | null;
    setValue: (value: string) => void;
}

// Creating context with undefined as default
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component
const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ value, setValue }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
};

export { UserProvider, useUserContext };