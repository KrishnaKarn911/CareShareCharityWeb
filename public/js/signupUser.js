const form = document.getElementById('signup');
const logo=document.getElementById('logo');




logo.addEventListener('click',()=>{
    window.location.href='http://65.2.126.107:3000/charitylife/';
})

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const isAdmin = document.getElementById('admin').checked;

   
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'none';
    messageElement.textContent = '';

    if (password !== confirmPassword) {
        messageElement.textContent = 'Passwords do not match.';
        messageElement.style.display = 'block';
        return;
    }

    try {

            
        const response = await axios.post('http://65.2.126.107:3000/charitylife/user/register', {
            name: name,
            email: email,
            password: password,
            isAdmin: isAdmin
        });
        console.log(response);

    
     
        if (response.status === 201) {
            alert('Successfully Registered');
            window.location.href = 'http://65.2.126.107:3000/charitylife/user/login';
        } else {
            messageElement.textContent = response.message;
            messageElement.style.display = 'block';
        }
  
        
    } catch (err) {
        console.log(err);
        messageElement.textContent = err.response ? err.response.data.message : 'An error occurred. Please try again.';
        messageElement.style.display = 'block';
    }
});


