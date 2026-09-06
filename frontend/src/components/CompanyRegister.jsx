import { useState } from "react"

export default function CompanyRegister() {
    const [companyObj, setCompanyObj] = useState({
        companyName: '',
        pib: '',
        email: '',
        password: '',
        role: 'company'
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setCompanyObj(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="company-register-container">
            <label htmlFor="name-field">
                Enter company name:

                <input 
                    type="text" 
                    name="companyName"
                    id="name-field"
                    value={companyObj.companyName} 
                    onChange={e => handleChange(e)}
                />
            </label>

            <label htmlFor="email-field">
                Enter company email:

                <input 
                    type="email"
                    name="email"
                    id="email-field"
                    value={companyObj.email}
                    onChange={e => handleChange(e)}
                />
            </label>

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
                <button>REGISTER</button>
            </div>
        </div>
    )
}