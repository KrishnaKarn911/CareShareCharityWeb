
const logo=document.getElementById('logo');




logo.addEventListener('click',()=>{
    window.location.href('http://localhost:3000/charitylife/');
})

 let slideIndex = 0;
        const slides = document.querySelectorAll('.slide');

        function showSlides() {
            slides.forEach(slide => slide.style.display = 'none');
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = 'block';
            setTimeout(showSlides, 5000); // Change image every 5 seconds
        }
        showSlides();


        const UserRegbtn = document.getElementById('donarRegisterBtn');
        const CharityRegbtn = document.getElementById('charityRegisterBtn');


        UserRegbtn.addEventListener('click',()=>{
            window.location.href='http://localhost:3000/charitylife/user/register'
        })

        CharityRegbtn.addEventListener('click',()=>{
            window.location.href='http://localhost:3000/charitylife/charity/register'
        })
