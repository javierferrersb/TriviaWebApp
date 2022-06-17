import React from "react";
import "./ErrorMessage.css";

function ErrorMessage() {
    return (
        <div className="error-area">
            <div className="error-message-area">
                <h1 className="error-message-title">Error!</h1>
                <p className="error-message-text">
                    Something went wrong. Please try again later. Are you sure
                    you are connected to the internet?
                </p>
            </div>
        </div>
    );
}

export default ErrorMessage;
