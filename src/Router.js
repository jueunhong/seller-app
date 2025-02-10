import { Routes, Route } from "react-router-dom";

import Login from "./pages/login.js";
import Admin from "./pages/admin.js";

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/admin' element={<Admin/>}/>
        </Routes>
    )
}


export default Router;