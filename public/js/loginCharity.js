const form=document.getElementById('login');
form.addEventListener('submit',async(e)=>{
   e.preventDefault();

    try {
        const response = await axios.post('http://65.2.126.107:3000/charitylife/charity/login', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        });

        console.log(response.data);

        localStorage.setItem('tokenCharity_Institute', response.data.token);

        
        if (response.data.status==='success') {
            window.location.href = "http://65.2.126.107:3000/charitylife/charity/profile";
        } else {
            alert('Something went wrong, try again later');
            window.location.href = "http://65.2.126.107:3000/charitylife/charity/login";
        }
    } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
            alert('Username or Password is incorrect');
        } else if (err.response.status === 404) {
            alert('User does not exist, please signup');
        }
    }
})