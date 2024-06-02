import React ,{useEffect}from 'react'

function NotificationForAdmin(props) {
 
  const onClick = async () => {
    const secKey = localStorage.getItem("secKey")||"";
    try {
        console.log("notification deleted " + props._id);

        const response = await fetch("http://localhost:3000/deletenotification", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: props._id ,secKey:secKey})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const res = await response.json();
        if(res.error){
            alert(res.error);
            return;
        }
        console.log("response is " + JSON.stringify(res));
        alert("notification delete succ");
        window.location.reload();
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};
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
      overflowWrap: "break-word" // Allow text to wrap instead of overflowing
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

        <button onClick={onClick} style={{
          border:"solid",
          background:"red",
          color:"black",
          fontSize:"1.2rem",
          borderRadius:"3px",
          marginTop:"3rem"
        }} >Delete</button>
  </div>
  )
}

export default NotificationForAdmin
