import { useState } from "react"

export default function CompanyLogin() {
    const [companyObj, setCompanyObj] = useState({
        pib: '',
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
        <div className="company-login-container">
            <label htmlFor="pib-field">
                Enter PIB:

                <input 
                    type="text" 
                    name="pib"
                    id="pib-field"
                    value={companyObj.pib}
                    onChange={e => handleChange(e)}
                />
            </label>

            <label htmlFor="password-field">
                Enter password:

                <input 
                    type="password" 
                    name="password"
                    id="password-field"
                    value={companyObj.password}
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