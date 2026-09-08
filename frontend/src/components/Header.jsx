import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigationObj = useNavigate();
    
    function handleNavigation(path) {
        navigationObj(path);
    }

    return (
        <header>
            <h1>Find-job.com</h1>

            <div className="nav-links">
                <p onClick={() => handleNavigation('/')}>Home</p>

                <p onClick={() => handleNavigation('/profile')}>Profile</p>

                <p onClick={() => handleNavigation('/login')}>Sign up</p>

                <p onClick={() => handleNavigation('/create-acc')}>Create account</p>
            </div>
        </header>
    )
}