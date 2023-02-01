import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import GlobalStyle from './components/globalStyle';
import Menu from "./components/Menu";
import Movies from "./components/Movies";
import Session from "./components/Session";
import Seats from "./components/Seats";
import Sucess from "./components/Sucess";
import { Fragment } from "react/cjs/react.production.min";

export default function App() {
    const [object, setObject] = useState({});

    return (
        <Fragment>
            <GlobalStyle />
                <BrowserRouter>
                    <Menu />
                    <Routes>
                        <Route path="/" element={<Movies />}/>
                        <Route path="/sessoes/:movieId" element={<Session />}/>
                        <Route path="/assentos/:sessionId" element={<Seats setObject={(e) => setObject(e)} />}/>
                        <Route path="/sucesso/" element={<Sucess object={object}/>}/>
                    </Routes>
                </BrowserRouter>
        </Fragment>
    );
}