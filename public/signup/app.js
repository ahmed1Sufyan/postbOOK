import { addInDBById, logout } from "../firebase/functions.mjs";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, db } from "../firebase/service.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// check if the user is already authenticated then move on to the home page
// 

// const auth = getAuth();
window.addEventListener("load",()=>{
  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
          // window.location = "../home/inde.html"
        console.log(user);
        // ...
      } else {
        console.log("User is not signed in");
        // if(location.pathname !== "/signup/index.html")
        // window.location = "../signup/index.html";
      }
    });
})


// console.log( typeof());


const innercont = document.querySelector(".inner")

window.innercont = innercont


/// page move start
    const moveleftbtn = document.querySelector("#moveleft")
    const moverightbtn = document.querySelector("#moveright")
    moveleftbtn.addEventListener("click", moveleft)
    moverightbtn.addEventListener("click", moveright)
    function moveleft()
{
    innercont.style.transform = "translateX(4px)"
    console.log(innercont.style.transform)
}
function moveright()
{
    innercont.style.transform = "translateX(-392px)"
    console.log(innercont.style.transform)
}
/// page move end


const signup_btn = document.querySelector("#signup_btn")
const input = document.querySelectorAll(".sign_up")
signup_btn.addEventListener("click", () =>{
    const username = input[0].value
    const email = input[1].value
    const password = input[2].value
    // const location =  window.navigator.geolocation.getCurrentPosition(
    //   (position) =>{
    //     return position;
    //   }
    //   )

     
   const userdata = {
      username,
      email,
      password,
      address : null,
      profile_picture : null,
      location : null
    }
createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user;

    const id = await addInDBById(userdata,user.uid,"users")
  // await addDoc(collection(db, "users"), {
  //  ...userdata,
  //  id : user.uid
  // });
  // console.log("Document written with ID: ", docRef.id);
console.log(id);
    // 
    // console.log(user);
    input[0].value = ""
    input[1].value = ""
    input[2].value = ""
    logout()
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
  }).finally(() => {
      moverightbtn.click()
  });

})

const login_btn = document.querySelector("#login_btn");
const loginData = document.querySelectorAll(".log-in")
login_btn.addEventListener("click", () => {

    const email = loginData[0].value
    const password = loginData[1].value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("successfully signed in");
      loginData[0].value = ""
      loginData[1].value = ""

      
    }).then(()=>{
      setTimeout(() => {
        window.location = "/public/home/inde.html"
      },2000)
     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
})