import React from "react";
import { func, string} from 'prop-types';
import { Switch } from "@material-ui/core";




const Toggler = ({theme, toggleTheme}) => {
    const isLight = theme === 'light';
    return (
        <>
        <>Dark</><Switch checked={isLight} onChange={toggleTheme}></Switch><>Light</>
        </>
    );       
};

// Toggler.propTypes = {
//     theme: string.isRequired,
//     toggleTheme: func.isRequired,
// }

export default Toggler;