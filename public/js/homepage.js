const logo = document.getElementById('logo');

logo.addEventListener('click', () => {
    window.location.href = 'http://65.2.126.107:3000/charitylife/';
});

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

UserRegbtn.addEventListener('click', () => {
    const url = 'http://65.2.126.107:3000/charitylife/user/register';
    console.log('Navigating to:', url);
    window.location.href = url;
});

CharityRegbtn.addEventListener('click', () => {
    const url = 'http://65.2.126.107:3000/charitylife/charity/register';
    console.log('Navigating to:', url);
    window.location.href = url;
});
