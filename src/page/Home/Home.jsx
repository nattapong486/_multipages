import './Home.css';



function Home() {
    return (
        <div className="home-container">
            <div className="profile-picture">
                <img src="./src/img/me.png" alt="Your Name" />
            </div>
            <div className="intro-text">
                <h1>Hello, I'm Nattapong Rakkaew</h1>
                <p>
                    Hi! I'm Gundam, and I'm currently 20 years old. I was born on 6/9/2004.
                </p>
                <p>
                    I'm currently studying at sripatum University, in the Information Technology, majoring in Full Stack Developer.
                    In my free time, I enjoy watching movies, playing games, and learning new technologies.
                </p>
                <p>
                    Feel free to explore my projects and learn more about my journey!
                </p>
            </div>
        </div>
    );
}

export default Home;