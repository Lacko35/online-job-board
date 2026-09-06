import { useState } from "react"
import CompanyRegister from "./CompanyRegister";
import WorkerRegister from "./WorkerRegister";

export default function Register() {
    const [chooser, setChooser] = useState(false);
    const [userType, setUserType] = useState('');

    function handleUserChoise() {
        if(!userType) {
           alert('You need to choose correct type of user if you want to create profile');
           return; 
        }

        setChooser(true);
        window.localStorage.setItem('user-type', userType);
    }

    return (
        <div className="register-container">
            {
                chooser
                ?
                (
                    userType === 'company'
                    ?
                    ( <CompanyRegister /> )
                    :
                    ( <WorkerRegister /> )
                )
                :
                (
                    <div className="chooser-card">
                        <select name="userType" value={userType} onChange={e => setUserType(e.target.value)}>
                            <option value="">---Choose type of user---</option>

                            <option value="worker">Worker</option>

                            <option value="company">Company</option>
                        </select>

                        <button onClick={handleUserChoise}>Confirm your choise</button>
                    </div>
                )
            }
        </div>
    )
}