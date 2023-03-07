import React from "react";
import {Container} from "@material-ui/core";
import { BrowserRouter, Routes , Route, Navigate  } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    return(
        <GoogleOAuthProvider clientId="432539687481-53516kvqe2n45d92a1qc7rkbl12np4br.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar /> 
                    <Routes >
                        <Route path="/" element={<Navigate replace to="/posts" />}/>
                        <Route path="/posts" exact element={<Home/>}/>
                        <Route path="/posts/search" exact element={<Home/>}/>
                        <Route path="/posts/:id" exact element={<PostDetails/>}/>
                        <Route path="/auth" exact element={<Auth/>}/>
                    </Routes >
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    ); 
}

export default App;