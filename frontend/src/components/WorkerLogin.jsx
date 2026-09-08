import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function WorkerLogin() {
    const navigationObj = useNavigate();
    
    const [workerObj, setWorkerObj] = useState({
        username: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        
        setCompanyObj(prev => ({
            [name]: value
        }));
    }

    function handleAccountCreation() {
        navigationObj('/create-acc');
    }

    return (
        <div className="worker-login-container">
            <label htmlFor="username-field">
                Enter your username:

                <input 
                    type="text" 
                    name="username"
                    id="username-field"
                    value={workerObj.username}
                    onChange={e => handleChange(e)}
                />
            </label>

            <label htmlFor="password-field">
                Enter password:

                <input 
                    type="password" 
                    name="password"
                    id="password-field"
                    value={workerObj.password}
                    onChange={e => handleChange(e)}
                />
            </label>

            <div>
                <button>LOGIN</button>
            </div>

            <p onClick={() => handleAccountCreation()}>You dont have account? Create one.</p>
        </div>
    )
}