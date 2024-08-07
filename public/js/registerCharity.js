 const form=document.getElementById('charityRegister');
    form.addEventListener('submit', async(e)=>{
        e.preventDefault();
        let name=document.getElementById('name').value;
        let desc=document.getElementById('description').value;
        let password=document.getElementById('password').value;
        let email=document.getElementById('email').value;

        try{
            const charityNew = await axios.post('http://65.2.126.107:3000/charitylife/charity/register',{
                name:name,
                description: desc,
                email: email,
                password: password,
            });
            if(charityNew.data.status==='success'){
                alert('Charity Sent for an approval');
                window.location.href='http://65.2.126.107:3000/charitylife/charity/login';
               
            }else{
                alert('something went wrong try after sometime');
            }
        }catch(err){
            console.log(err);
        }
    })