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
                <p>Home</p>

                <p onClick={() => handleNavigation('/jobs')}>Jobs</p>

                <p>Saved jobs</p>

                <p>Profile</p>

                <p onClick={() => handleNavigation('/sign-up')}>Sign up</p>
            </div>
        </header>
    )
}