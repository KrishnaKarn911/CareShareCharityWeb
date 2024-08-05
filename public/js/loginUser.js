const form=document.getElementById('login');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    
    try{

        const token = localStorage.getItem('tokenCharity');
       
        const response = await axios.post('http://localhost:3000/charitylife/user/login', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    });
        console.log("In front End",response)

        if(response.status===200){
            alert('Logged In Successfully')
            localStorage.setItem('tokenCharity', response.data.token);
            window.location.href="http://localhost:3000/charitylife/user/userProfile"
        }
    }catch(err){
        console.log(err);
        if(err.response.status===401){
           alert('Username or Password is incorrect');
        }else if(err.response.status===404){
            alert('User does not exist, please signup');
        }
        
    }
})