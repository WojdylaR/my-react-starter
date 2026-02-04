import { useEffect } from "react";
import AuthForm from "./components/AuthForm";
import { useLogout } from "./hook/useLogout";

function AuthPage() {

    const logout = useLogout()

    useEffect(() => {
        logout();
    }, []);

    return <main className="auth-page">
        <div className="container">
            <div className="auth-form">
                <AuthForm />
            </div>
            <div className="welcome">
                <h3 className="title">Bienvenue sur Mon starter React !</h3>
                <p>Veuillez vous connecter pour continuer</p>
            </div>
        </div>
    </main>;
}

export default AuthPage;