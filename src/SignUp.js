import React from "react";
import {signup} from "./ApiService";
import {Link} from "react-router-dom";
import { Button, TextField, Typography, Grid, Container } from "@mui/material";

function SignUp(){
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        signup({username: username, password: password}).then(
            (response) => {
                window.location.href = "/login";
            }
        );
    };

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component = "h1" variant = "h5">
                            회원가입
                    </Typography>
                </Grid>
            </Grid>
            
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="fname"
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="아이디"
                        autoFocus

                    />
                </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="패스워드"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                    회원가입
                </Button>
            </Grid>
            <Grid item>
                <Link to="/login" variant="body2" className="goSignUp">
                    이미 계정이 있으신가요? 로그인 하세요.
                </Link>
            </Grid>
            </Grid>
            </form>
        </Container>
    );
};

export default SignUp;