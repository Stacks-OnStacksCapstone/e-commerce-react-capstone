import React from "react";
import { func, string} from 'prop-types';
import { Switch } from "@material-ui/core";

const Toggler = ({theme, toggleTheme}) => {
    return (
        <>
        <>Dark</><Switch onChange={toggleTheme}></Switch><>Light</>
        </>
    );       
};

// Toggler.propTypes = {
//     theme: string.isRequired,
//     toggleTheme: func.isRequired,
// }

export default Toggler;