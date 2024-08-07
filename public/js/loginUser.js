const form=document.getElementById('login');
form.addEventListener('submit',async(e)=>{
   e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/charitylife/user/login', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        });

        console.log(response.data);

        localStorage.setItem('tokenCharity', response.data.token);

        const userProfileResponse = await axios.get('http://localhost:3000/charitylife/user/profileData', {
            headers: { "Authorization": `Bearer ${response.data.token}` }
        });


        console.log(userProfileResponse.data);

        if (userProfileResponse.data.data.isAdmin) {
            window.location.href = "http://localhost:3000/charitylife/admin/profile";
        } else {
            window.location.href = "http://localhost:3000/charitylife/user/profile";
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

const logo=document.getElementById('logo');




logo.addEventListener('click',()=>{
    window.location.href='http://localhost:3000/charitylife/';
})