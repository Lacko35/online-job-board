import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigationObj = useNavigate();

    function handleNavigation(type) {
        if(type === 'worker') {
            window.localStorage.setItem('user-type', "worker");
        }
        else {
            window.localStorage.setItem('user-type', "company");
        }

        navigationObj('/login');
    }

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Connect with right job - or the right worker</h1>

                <p>
                    The platform that brings together factories looking for workers 
                    and workers looking for jobs — fast, simple, and all in one place.
                </p>

                <div className="btns-container">
                    <button onClick={() => handleNavigation("worker")}>Find a job</button>

                    <button onClick={() => handleNavigation("company")}>Post a job</button>
                </div>
            </div>

            <div className="workers-card">
                <h1>Find the job that fits you</h1>

                <p>
                    Browse current job listings from factories near you, apply in 
                    just a few clicks, 
                    and track the status of all your applications in one place. 
                    No more sending your CV to dozens of emails — 
                    everything is organized and easy to follow.  
                </p>

                <ul>
                    <li>Browse all open positions</li>

                    <li>Apply with one click</li>

                    <li>Track application status</li>
                </ul>
            </div>

            <div className="factories-card">
                <h1>Find workers quickly and easily</h1>

                <p>
                   Post a job listing in just a few minutes and start receiving 
                   applications right away. 
                   Review candidates, manage all applications in one place, 
                   and fill open positions faster. 
                </p>

                <ul>
                    <li>Unlimited job postings</li>

                    <li>Review and manage applications</li>

                    <li>Contact candidates directly through the platform</li>
                </ul>
            </div>

            <div className="how-works-container">
                <h1>Simple in 3 steps</h1>

                <ol>
                    <li><b>Register -</b> choose whether you're a worker or a factory</li>

                    <li><b>Connect -</b> search for jobs or post a listing</li>

                    <li><b>Track progress -</b> all appllications in one place</li>
                </ol>
            </div>

            <div className="why-us-container">
                <h1>Why use our platform</h1>

                <p>
                    We save time for both sides — workers looking for stable employment, 
                    and factories that need reliable workforce. 
                    All applications, listings, and statuses are transparent and 
                    available in real time.
                </p>
            </div>
        </div>
    )
}