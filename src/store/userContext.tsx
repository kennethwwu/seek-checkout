import React, { useState, useEffect, createContext } from 'react';
import { UserType } from '../types/user'

interface UserContextInterface {
    user: string,
    setUser: Function
}

export function useUser() {
    const [user, setUser] = useState<string>(UserType.Default);

    useEffect(() => {
        const cachedUser = localStorage.getItem('user') || UserType.Default;
        setUser(cachedUser)
    }, [])

    function setNewUser(newUser: UserType) {
        setUser(newUser);
        localStorage.setItem('user', newUser);
    }
    return { user, setNewUser }
}

const userContext = createContext<UserContextInterface>({
    user: UserType.Default,
    setUser: () => { }
});

export default userContext;