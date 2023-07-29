import React from "react";
import { useNavigate } from "react-router-dom"
import '../../index.css';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="unauthorized-section">
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button className="go-back" onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized