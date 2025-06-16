import { createContext, useState } from "react"

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [selectedUser, setSelectedUser] = useState(false);

    const value = {
        selectedUser,
        setSelectedUser
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider