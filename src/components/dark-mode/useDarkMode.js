import { DarkMode } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react"
import { RefreshContext } from "../../context/refresh.context";

export const useDarkMode = () => {
    const {toggle, setToggle} = useContext(RefreshContext)
    const [theme, setTheme] = useState('dark');

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode);
        setToggle(!toggle);
    };

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme)
    }, []);

    return [theme, themeToggler]
};

module.exports = useDarkMode;