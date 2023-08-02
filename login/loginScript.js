const email = document.getElementById('emailInput');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorContainer=document.getElementById('errorContainer');

loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    errorContainer.innerHTML=" ";

    if (email.value.trim() === '' || password.value.trim() === '') {
        // alert('fields are mandatory');
        const p=document.createElement('p');
        p.innerText='All Fields are mandatory!!!!'
        p.style.color='red';    

        errorContainer.appendChild(p);
    }
    else {
        let users = JSON.parse(localStorage.getItem('users'));
        if (users) {
            let currentUser = users.find(user => {
                return user.email === email.value.trim();
            });
            if (currentUser) {
                if(password.value.trim()===currentUser.password){
                    sessionStorage.setItem('loggenInUser',JSON.stringify(currentUser));
                    window.location.href='../mainContent';
                    alert('logged in');
                }
                else{
                    // alert('incorrect password');
                    const p=document.createElement('p');
                    p.innerText='Incorrect Password!!!!'
                    p.style.color='red';    

                    errorContainer.appendChild(p);
                }
            }
            else {
                // alert('you have not signed up');
                const p=document.createElement('p');
                p.innerText='You have not signed up!!!!'
                p.style.color='red';    
        
                errorContainer.appendChild(p);
            }
        }
        else {
            // alert('you have not signed up');
            const p=document.createElement('p');
            p.innerText='You have not signed up!!!!'
            p.style.color='red';    
    
            errorContainer.appendChild(p);
        }
    }
})