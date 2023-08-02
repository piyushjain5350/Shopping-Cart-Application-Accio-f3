// console.log('test');
const firstName=document.getElementById('firstName');
const lastName=document.getElementById('lastName');
const email=document.getElementById('emailInput');
const password=document.getElementById('password');
const cnfPassword=document.getElementById('cnfPassword');
const signUpBtn=document.getElementById('signUpBtn');
const erroeContainer=document.getElementById('errorContainer');

const form=document.getElementById('signUpForm');
signUpBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    erroeContainer.innerHTML='';

    if(firstName.value.trim()===''||
       lastName.value.trim()===''||
       email.value.trim()===''||
       password.value.trim()===''||
       cnfPassword.value.trim()===''
    ){
        const p=document.createElement('p');
        p.innerText="Error: All fields are mandatory!";
        p.style.color="red";
        errorContainer.appendChild(p);
    }else{
        if(password.value.trim()!==cnfPassword.value.trim()){
            const p=document.createElement('p');
            p.innerText="Password mismatch!!!!!";
            p.style.color="red";

            errorContainer.appendChild(p);
        }else{
            if(ValidateEmail(email.value)){
                var token = generateToken(16);
                if (localStorage.getItem('users')) {
                    if (checkIfUserExist(email.value)) {
                        alert('email is linked with other account');
                    } else {
                        saveUser(firstName.value, lastName.value, email.value, password.value,token);
                    }
                } else {
                    saveUser(firstName.value, lastName.value, email.value, password.value,token);
                }
            }
        }
    }
});

function ValidateEmail(input){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {
       
        return true;

    } else {

        const p=document.createElement('p');
        p.innerText="Email incorrect!!!";
        p.style.color="red";
        errorContainer.appendChild(p);
        
        return false;
    }
};
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateToken(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

function saveUser(fName,lName,email,password,token){
    let usersData={
        firstName:fName,
        lastName:lName,
        email:email,
        password:password,
        uniqueID:token
    }

    let users = JSON.parse(localStorage.getItem('users'));
    if(users === null){
        users = [];
    }
    users.push(usersData);
    localStorage.setItem('users',JSON.stringify(users));

    //  write a logic that this user is signed in
    // session storage will delete data after tab is closed
    sessionStorage.setItem('loggenInUser',JSON.stringify(usersData));

    // result our input value
    form.reset();
    
    alert("Successfully singed up");

    window.location.href="../mainContent";

}

function checkIfUserExist(email){
    let users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    // users will be array of objects
    const obj = users.find(users=>{
        console.log(users.email);
        return users.email === email;
        // if obj with email is exist 
    })
    if(obj) return true;
    else return false;
}