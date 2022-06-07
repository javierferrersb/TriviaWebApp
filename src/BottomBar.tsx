import React from "react";
import "./BottomBar.css";

function BottomBar() {
    return (
        <div className="bottom-bar">
            <div className="progress-area">
                <div className="progress-indicator">
                    <div className="progress-indicator-fill"></div>
                </div>
                <div className="progress-text">1 / 5</div>
            </div>
            <button className="next-button">CONTINUE</button>
        </div>
    );
}

export default BottomBar;
