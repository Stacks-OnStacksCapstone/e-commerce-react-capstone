import React from "react";
import { func, bool} from 'prop-types';
import { Switch } from "@material-ui/core";

const Toggler = ({theme, toggleTheme}) => {
    return (
        <>
        <>Light</><Switch onChange={toggleTheme}></Switch><>Dark</>
        </>
    );       
};

Toggler.propTypes = {
    theme: bool.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggler;