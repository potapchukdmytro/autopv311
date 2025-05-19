import React from "react";
import { Route, Routes } from "react-router";
import DefaultLayout from "./components/layout/DefaultLayout";
import HomePage from "./pages/homePage/HomePage";
import "./App.css";
import RoleListPage from "./pages/rolePage/RoleListPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
                <Route path="role" element={<RoleListPage />} />
            </Route>
        </Routes>
    );
};

export default App;
