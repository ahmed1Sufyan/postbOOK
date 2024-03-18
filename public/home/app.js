import { addInDB, addInDBById, getAllDataOrderedByTimestamp, getData, uploadFile } from "../firebase/functions.mjs";
import { addDoc, auth, db, getDoc, onAuthStateChanged, signOut } from "../firebase/service.js";
import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const profilecard = document.querySelector(".profilecard")
const setusername = document.getElementById("username");
const setemail = document.getElementById("email");
const setaddress = document.getElementById("address");
const setprofile_picture = document.getElementById("profile_picture");


const Auth = async(user) => {


  if (user) {
    let data = await getData(user.uid,"users")
    const {address,email,username,profile_picture} = data.data
    
    profilecard.innerHTML = `
    <img src="${profile_picture || "../profile picture/pp.jpg"}" class="card-img-top pp"  >
                <div class="card-body">
                  <h5 class="card-title">${username}</h5>
                  <p class="card-text">Alhumdulillah for everything I've &#9829;</p>
                  <p class="card-text">${email}</p>
                  <p class="card-text">${address || ""}</p>
                  <a href="#" class="btn btn-primary updateprofile" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" >Update Profile</a>
                 </div>` 

                 
                 setusername.value = username
                 setemail.value = email
                 setaddress.value = address
            
                  // window.location = "./public/home/inde.html";

                  displayPost()

                 
  } 
  else  window.location = "./public/home/inde.html";
}
onAuthStateChanged(auth, Auth);
// console.log(auth.currentUser);
// display post
const Allpost  = document.getElementById("allpost");
let DeletePostBtn ;
const displayPost = async()=>{
  Allpost.innerHTML = ""
 
  const posts = await getAllDataOrderedByTimestamp("Post")
  console.log(posts);
if(posts.status == false)
{
  Allpost.innerHTML = `<div style="font-weight : 800; font-size:4rem; color: gray;"> NO POST HERE </div>`
  return  
}

Allpost.innerHTML = ""
posts.data.map(async(postdata)=>{
  const user = await getData(postdata[1].postCreator,"users")
  console.log(postdata[0],user.data);
  // return
 return Allpost.innerHTML += `
  <div class="card card1" style="width: 18rem;">
  <div class="card-body">
     <div class="post-creator">
      <img class="creator-profile" src="${user?.data?.profile_picture || "../profile picture/pp.jpg"}" alt="">
      <p class="creator-name">${user?.data?.username}</p>
      ${auth.currentUser.uid == postdata[1].postCreator ? `<button type="button" class="btn btn-primary EditPostBtn" id="${postdata[0]}" >Edit</button>` : ""}
      ${auth.currentUser.uid == postdata[1].postCreator ? `<button type="button" class="btn btn-primary DeletePostBtn" id="${postdata[0]}" name="">Delete</button>` : ""}
     </div>
     ${postdata[1].postContent ? `<p class="card-text">${postdata[1].postContent}</p>` : ""}
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
  </div>
  ${postdata[1].postImageURL ? `<img src="${postdata[1].postImageURL}" class="card-img-top" alt="...">` : ``}
  <div class="like-section">
      <div class="likebtn" style="cursor : pointer">
      <img src="../assets/thumbs-up-regular.svg"/>
          Like ${postdata[1].likes}</div>
      <div class="commentbtn">
      <img src="../assets/comment-solid.svg" alt="">
      Comment ${postdata[1].comments}</div>
      <div class="sharebtn">
      <img src="../assets/share-solid.svg" alt="">
      Share</div>
  </div>
  `  
})

  setTimeout(() => {
    
DeletePostBtn = document.querySelectorAll(".DeletePostBtn")
DeletePostBtn.forEach((btn) => {
  btn.addEventListener("click",deleteposthandler)
})
  }, 2000);
}

// <i class="fa-solid fa-thumbs-up"></i>
const logout_bt = document.querySelector("#logout")


logout_bt.addEventListener("click",() => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("Signout successful");
    window.location = "../index.html";
      }).catch((error) => {
        alert(error.message)
      });
})


// profile details


const modal_update_btn = document.getElementById("modal_update_btn");
modal_update_btn.addEventListener("click",async()=>{
  setprofile_picture.files = null
  console.log(setprofile_picture);
  const data = await getData(auth.currentUser.uid,"users")
  console.log(data.profile_picture);
  const profilepicturename = auth.currentUser.uid + "-" + setprofile_picture?.files[0]?.name
const addprofile_pic = await uploadFile(setprofile_picture?.files[0],profilepicturename)

console.log(addprofile_pic);
  const user = {
    address : address.value,
    email : data.data.email || "shan@gmail.com",
    password : data.data.password || "123321123",
    profile_picture : addprofile_pic.downloadURL || data.profile_picture || null,
     username : username.value
  }

 const dataAdd = await addInDBById(user,auth.currentUser.uid,"users")
console.log(dataAdd);

document.getElementById("update_close_btn").click();
await Auth()
        })  

const postBtn = document.getElementById("postBtn")

postBtn.addEventListener("click",async()=>{


  const message_text = document.getElementById("message-text").value
  let postImageName ;
  let postImageFile ;
  let postimageadd ;

  if(document.getElementById("postImage")?.files[0]?.name)
  {
   postImageName = auth.currentUser.uid + "-" + Date.now() + "-" + document.getElementById("postImage").files[0].name
   postImageFile = document.getElementById("postImage").files[0]
   postimageadd = await uploadFile(postImageFile,postImageName)

  }

  if(!postImageName && !message_text)
  {
    alert("kch daal bhai")
    return 
  }

  const postContent = {
    postID : (Date.now()+Math.round(Math.random() * 10000)) + "0",
    postCreator : auth.currentUser.uid,
    postContent : message_text || null,
    postImageURL : postimageadd?.downloadURL || null,
    likes : 0,
    comments : 0
  }
  await addInDB(postContent,"Post")
  document.getElementById("postmodalbtn").click()
  displayPost()
//  console.log(message_text,postimageadd);
})


// Delete post
const deleteposthandler = async(e)=>{
 
  const postid = e.target.getAttribute("id")
  console.log(postid);
const postdelete = await deleteDoc(doc(db,"Post",postid));
console.log(postdelete);
displayPost();

}
// const post = await getAllDataOrderedByTimestamp("Post")
// console.log(post);