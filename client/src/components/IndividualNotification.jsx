import React from 'react';

const IndividualNotification = (props) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: "4px",
            border: "solid",
            borderRadius: "10px",
            padding: "10px",
            maxWidth: "50vw", // Limit maximum width of the container
            margin: "auto",
            marginBottom: "1.3rem",
            overflowWrap: "break-word",
            marginBottom:"2rem" // Allow text to wrap instead of overflowing
        }}>
            {props.imageUrl &&
                <div style={{ margin: "auto" }}>
                    <img width={"500"} src={props.imageUrl} alt="" />
                </div>
            }

            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: "1.8rem" }}>
                    {props.title}
                </h1>

                <p>
                    {props.dsc}
                </p>
            </div>
        </div>
    );
};

export default IndividualNotification;
