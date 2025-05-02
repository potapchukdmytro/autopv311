import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const DefaultLayout: React.FC = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
