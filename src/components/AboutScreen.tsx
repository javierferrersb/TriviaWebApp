import "../styles/AboutScreen.css";
import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

function AboutScreen() {
    const navigate = useNavigate();
    return (
        <div className="about-area">
            <button
                className="back-button"
                onClick={() => {
                    navigate("/");
                }}
            >
                {" "}
                BACK
            </button>
            <img src={Logo} alt="logo" className="logo" />

            <div className="about-message-area">
                <h1 className="about-message-title">Trivia App</h1>
                <p className="about-message-text">
                    Simple trivia webapp made using React and Typescript
                </p>
                <div className="links">
                    <a
                        className="about-message-link"
                        href="https://opentdb.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Questions obtained from Open Trivia DB (CC BY-SA 4.0)
                    </a>
                    <a
                        className="about-message-link"
                        href="https://github.com/javierferrersb/TriviaWebApp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github Project Link
                    </a>
                </div>
            </div>
            <a
                className="footer-message"
                href="https://github.com/javierferrersb/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Made with ❤️ in Spain
            </a>
        </div>
    );
}

export default AboutScreen;
