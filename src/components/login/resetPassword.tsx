import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import { AxiosError } from 'axios';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [message,setMessage] = useState(String);
    const {token} = useParams();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
        } catch (error: unknown) {
        }
    };

    return (
    <>
    
    </>
    );

}