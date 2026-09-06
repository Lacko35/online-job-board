import { useState } from "react"

export default function WorkerRegister() {
    const [workerObj, setWorkerObj] = useState({
        fullName: '',
        username: '',
        jobTitle: '',
        email: '',
        password: '',
        role: 'worker'
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setWorkerObj(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="worker-register-container">
            <label htmlFor="name-field">
                Enter full name:

                <input 
                    type="text" 
                    name="fullName"
                    id="name-field"
                    value={workerObj.companyName} 
                    onChange={e => handleChange(e)}
                />
            </label>

            <label htmlFor="email-field">
                Enter your email:

                <input 
                    type="email"
                    name="email"
                    id="email-field"
                    value={workerObj.email}
                    onChange={e => handleChange(e)}
                />
            </label>

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

            <label htmlFor="jobTitle-field">
                Enter your job title:

                <input 
                    type="text" 
                    name="jobTitle"
                    id="jobTitle-field"
                    value={workerObj.jobTitle}
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
        </div>
    )
}