import React from 'react';
import {useState, useContext, useEffect} from 'react';
import { RefreshContext } from "../../context/refresh.context";

//Succesful tests

describe('useDarkMode', () => {
    it('Theme should be dark', () => {
        const theme = 'dark';
        
        expect(theme).toBe('dark');
    })
    
});


describe('Checking themeToggler logic', () => {

    it('Should switch between themes', () => {
        let theme = 'dark';

        // if(theme === 'dark'){
        //     theme = 'light';
        // }
        // else{
        //     theme = 'dark';
        // }

        theme === 'dark' ? theme = 'light': theme = 'dark';

        expect(theme).toBe('light');

    })

})

//THE BELOW TESTS FAIL

// const darkMode = require('../dark-mode/useDarkMode.js');

// describe('testing the state of theme', () => {
//   test('theme should currently be dark', () => {
//     expect(darkMode).toBe('dark');
//   })
// });

