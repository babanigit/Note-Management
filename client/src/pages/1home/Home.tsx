
import { Container } from "react-bootstrap";


import styles from "../../style/notePage.module.css";

import LoginModel from "../../components/RegisterModel/LoginModel";
import RegisterModel from "../../components/RegisterModel/RegisterModel";
import NavBar from "../../components/navBar/NavBar";
import { useEffect, useState } from "react";
import { UserModel } from "../../model/userModel";

import * as NoteApi from "../../networks/note_api"
import NotesPageLoggedInView from "../../components/note/NotesPageLoggedInView";
import NotesPageLogoutview from "../../components/note/NotesPageLogoutview";


const Home = () => {

  const [loggedInUser,setLoggedInUser] = useState<UserModel|null>(null);

  const[showRegModel,setShowRegModel]= useState(false);

  const[showLogModel,setShowLogModel]=useState(false);


  // here we are fetching logged in user 
  useEffect(()=> {
    async function fetchLoggedInUser() {
      try {

        const user= await NoteApi.getLoggedInUser();
        setLoggedInUser(user)

      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  })


  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() =>setShowLogModel(true)}
        onRegisterClicked={() => setShowRegModel(true)}
        onLogoutSuccessful={() =>setLoggedInUser(null)}
      />
      <Container className={` bg-blue-100 ${styles.notesPage} `}>


{/* if the logged in user is there then true else false */}

        {
        loggedInUser 
        ?<NotesPageLoggedInView />
      :<NotesPageLogoutview />
      }


       

      </Container>

      {showRegModel &&
          <RegisterModel
            onDismiss={() => setShowRegModel(false)}
            onRegistrationSuccessful={(user) => { 
              setLoggedInUser(user);
              setShowRegModel(false);
            }}
          />}

        {showLogModel &&
          <LoginModel
            onDismiss={() =>setShowLogModel(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLogModel(false);
             }}
          />}

      {/* <div className=" h-screen grid place-items-center place-content-center ">
        <div>hello</div>
        <button
          className=" border-2 rounded-md border-black p-2 bg-red-100"
          onClick={change}
        >
          {" "}
          <NavLink to={"/register"}>logout</NavLink>{" "}
        </button>
      </div> */}
    </>
  );
};

export default Home;
