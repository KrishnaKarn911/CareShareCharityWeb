const registerBtn=document.querySelector('.register-btn');
const loginBtn=document.querySelector('.login-btn');


registerBtn.addEventListener('click',(e)=>{
    window.location.href='http://localhost:3000/UserOrAdmin';
})

loginBtn.addEventListener('click',(e)=>{
    window.location.href('http://localhost:3000/userOrAdmin');
})