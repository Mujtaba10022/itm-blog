import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    loginHandler: (token) => {},
    logoutHandler: () => {}
});
export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const loginHandler = (token) => {
        setToken(token);
        setisLoggedIn(true);
        localStorage.setItem('auth', JSON.stringify({token, isLoggedIn: true}))
    }
    const logoutHandler = () => {
        setToken(null);
        setisLoggedIn(false);

        localStorage.clear();
    }

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler

    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext;