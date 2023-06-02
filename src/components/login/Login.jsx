import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Styles from './LogIn.module.css';
import Bluetooth from "../bluetooth/Bluetooth";


<script src="https://accounts.google.com/gsi/client" async defer> </script>

function LogIn(){
    const [user, setUser] = useState({})

    function handleCallbackResponse(response){
      let userObject = jwtDecode(response.credential)
      console.log(userObject)
      setUser(userObject)
      document.getElementById("signInDiv").hidden = true
    }
    function handleSignOut(e){
      setUser({});
      document.getElementById('signInDiv').hidden = false
    }


    useEffect(() =>{
      /* global google */
     google.accounts.id.initialize({
        client_id: "123097662276-nlbu7bmvmdnn8gdlu3i1looh18r3h7g8.apps.googleusercontent.com",
        callback: handleCallbackResponse
     })
  
     google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
     );
    }, [])
    

    return (
        <div className="App">
          <div id="signInDiv"></div>
          {Object.keys(user).length !== 0 &&
           <><button onClick={(e) => handleSignOut(e)}> Sign Out</button><Bluetooth /></>
          }
          {  user &&
          <div className={Styles.picAndImage}>
            <img src={user.picture} alt=""></img>
            <h3> {user.name}</h3>
          </div>
          }
        </div>
    );
}

export default LogIn