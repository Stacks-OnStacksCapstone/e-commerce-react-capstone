import React from "react";
import { func, string} from 'prop-types';
import { Switch } from "@material-ui/core";
import { DarkModeRounded } from "@mui/icons-material";
import { LightModeRounded } from "@mui/icons-material";




const Toggler = ({theme, toggleTheme}) => {
    const isLight = theme === 'light';
    return (
        <>
        <DarkModeRounded/><Switch checked={isLight} onChange={toggleTheme}></Switch><LightModeRounded/>
        </>
    );       
};

// Toggler.propTypes = {
//     theme: string.isRequired,
//     toggleTheme: func.isRequired,
// }

export default Toggler;