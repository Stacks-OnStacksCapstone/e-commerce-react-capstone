import React from "react";

interface RefreshContextState {
    toggle: boolean;
    setToggle: (toggle:boolean) => void;
}

// Define the Cart Context
// This will provided at the top level of the component hierarchy
// Then any child component will be able to access the cart info
// by using the useContext hook as follows:
// const { cart, setCart } = useContext(CartContext);
// And then the cart can be used and updated in a standard fashion
export const RefreshContext = React.createContext<RefreshContextState>({
    toggle: false,
    setToggle: () => { }
});