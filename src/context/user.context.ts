import React from 'react';
import User from '../models/User';

interface UserContextState {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
}
export const UserContext = React.createContext<UserContextState >({
    user: undefined,
    setUser: () => { }
});