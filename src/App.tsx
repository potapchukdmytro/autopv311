import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import HomePage from "./pages/homePage/HomePage";
import "./App.css";


const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    );
};

export default App;
