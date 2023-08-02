const firstName=document.getElementById('firstName');
const lastName=document.getElementById('lastName');
const oldPassword=document.getElementById('oldPassword');
const newPassword=document.getElementById('newPassword');
const cnfNewPassword=document.getElementById('cnfNewPassword');
const saveInfoBtn=document.getElementById('saveInfoBtn');
const changePasswordBtn=document.getElementById('changePasswordBtn');
const logoutBtn=document.getElementById('logoutBtn');
const messageConatainer=document.getElementById('message-container');

let loggedInUser=JSON.parse(sessionStorage.getItem('loggenInUser'));
if(loggedInUser===null){
    window.location.href='../';
}
console.log(loggedInUser);

function setDetails(loggedInUser){
    firstName.value=loggedInUser.firstName;
    lastName.value=loggedInUser.lastName;
}
setDetails(loggedInUser);

// get local storage details
let userData=JSON.parse(localStorage.getItem('users'));

console.log(userData);
//storing data of local storage
var userObj=userData.find((user)=>{
    if(loggedInUser.email===user.email){
        return user;
    }
});

// save info btn
saveInfoBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    messageConatainer.innerHTML='';
    
    //local storage
    userObj.firstName=firstName.value;
    userObj.lastName=lastName.value;
    
    //session storage
    loggedInUser.firstName=firstName.value;
    loggedInUser.lastName=lastName.value;

    
    const p=document.createElement('p');
    p.innerText="Details Succesfully saved";
    p.style.color='green';
    p.style.fontSize='16px';

    messageConatainer.appendChild(p);

})


// password change
changePasswordBtn.addEventListener('click',(e)=>{
    
    e.preventDefault();
    messageConatainer.innerHTML='';

    if(oldPassword.value===''||
       newPassword.value===''||
       cnfNewPassword.value==='')
       {
         
        const p=document.createElement('p');
        p.innerText="Please fill the mandatory password details";
        p.style.color='red';
        p.style.fontSize='16px';

        messageConatainer.appendChild(p);
    }
    if(userObj.password===oldPassword.value){
        if(newPassword.value===cnfNewPassword.value){
            //local storage
            userObj.password=newPassword.value;
            if(loggedInUser){
                loggedInUser.password=newPassword.value;
            }
            const p=document.createElement('p');
            p.innerText="Password Succesfully saved";
            p.style.color='green';
            p.style.fontSize='16px';

            messageConatainer.appendChild(p);

        }else{
            const p=document.createElement('p');
            p.innerText="New Password doesn't match with confirm password";
            p.style.color='red';
            p.style.fontSize='16px';
    
            messageConatainer.appendChild(p);
        }
    }else{

        const p=document.createElement('p');
        p.innerText="Old Password doesn't match";
        p.style.color='red';
        p.style.fontSize='16px';

        messageConatainer.appendChild(p);
    }
});


// Logout btn
logoutBtn.addEventListener('click',()=>{
    sessionStorage.clear();
    window.location.href="../";
})