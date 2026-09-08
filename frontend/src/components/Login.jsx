import CompanyLogin from "./CompanyLogin";
import WorkerLogin from "./WorkerLogin";

export default function Login() {
    const type = window.localStorage.getItem('user-type');

    return (
        <div className="login-container">
            {
                type === 'worker'
                ?
                (
                    <WorkerLogin />
                )
                :
                (
                    <CompanyLogin />
                )
            }
        </div>
    )
}