import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import HomePage from "../features/home/pages/HomePage"
import AuthPage from "../features/auth/AuthPage"
import NavigationComponent from "../features/navigation/NavigationComponent"
import ToastComponent from "../shared/components/notification/ToastComponent"

function ProtectedRoute() {

    return (
    <>
        <NavigationComponent />
        <Outlet />
    </>
    )
}

const Router = () => {


    return(
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<AuthPage />} />

                    <Route element ={<ProtectedRoute  />}>

                        <Route path="/" element={<Navigate to="/signboard" replace />} />


                        <Route path="/home" element={<HomePage />} />

                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastComponent />
        </Fragment>
    )
}

export default Router