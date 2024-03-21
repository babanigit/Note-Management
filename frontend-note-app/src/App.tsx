

import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";


import styles from "./style/notePage.module.css";

import { UserModel } from "./components/aModal/userModal";

import * as NoteApi from "./components/aNetwork/note_api"

// import LoginModel from "../../components/RegisterModel/LoginModel";
// import RegisterModel from "../../components/RegisterModel/RegisterModel";
// import NavBar from "../../components/navBar/NavBar";

import NotesPageLoggedInView from "./components/bNotes/NotesPageLoggedInView"
import NotesPageLogoutview from "./components/bNotes/NotesPageLogoutview";
import RegModal from "./components/cRegLogModal/RegModal";
import LogModal from "./components/cRegLogModal/LogModal";
import NavBar from "./components/dNavBar/NavBar";


const App = () => {

  const [loggedInUser,setLoggedInUser] = useState<UserModel|null>(null);

  // to show Registration modal
  const[showRegModel,setShowRegModel]= useState(false);

    // to show Login modal
  const[showLogModel,setShowLogModel]=useState(false);


  // getting the loggedInUser
  useEffect(()=> {

    async function fetchLoggedInUser() {
      try {
        const user= await NoteApi.getLoggedInUser();
        setLoggedInUser(user)

        console.log(user)
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  },[])


  return (
    <>

      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() =>setShowLogModel(true)}
        onRegisterClicked={() => setShowRegModel(true)}
        onLogoutSuccessful={() =>setLoggedInUser(null)}
      />
      <Container className={` bg-blue-100 ${styles.notesPage} `}>

        {
        loggedInUser 
        // true
        ?<NotesPageLoggedInView />
      :(
      <NotesPageLogoutview />
      // <></>
      )
      }


    
      </Container>

       {showRegModel &&
          <RegModal
            onDismiss={() => setShowRegModel(false)}
            onRegistrationSuccessful={(user) => { 
              setLoggedInUser(user);
              setShowRegModel(false);
            }}
          />}

        {showLogModel &&
          <LogModal
            onDismiss={() =>setShowLogModel(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLogModel(false);
             }}
          />} 


    </>
  );
};

export default App;
