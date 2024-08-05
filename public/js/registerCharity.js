 const form=document.getElementById('charityRegister');
    form.addEventListener('submit', async(e)=>{
        e.preventDefault();
        const name=document.getElementById('name').value;
        const desc=document.getElementById('description').value;

        try{
            const charityNew = await axios.post('http://localhost:3000/charitylife/charity/register',{
                name:name,
                description: desc,
            });
            console.log(charityNew);
        }catch(err){
            console.log(err);
        }
    })