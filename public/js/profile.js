// document.addEventListener('DOMContentLoaded', function(e) {
//     e.preventDefault();
//     const token = localStorage.getItem('jwtToken');
//     console.log(token);
//     if (!token) {
//         window.location.href = 'http://localhost:3000/user/login';
//         return;
//     }

//     axios.post('https:localhost:3000/charitylife/user/userProfile', {}, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(response => {
//         const data = response.data;
//         if (data.valid) {
//             document.getElementById('profileInfo').textContent = `Welcome, ${data.username}!`;
//         } else {
//             localStorage.removeItem('jwtToken');
//             window.location.href = 'login.html';
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         localStorage.removeItem('jwtToken');
//         window.location.href = 'login.html';
//     });

//     document.getElementById('logoutButton').addEventListener('click', function() {
//         localStorage.removeItem('jwtToken');
//         window.location.href = 'login.html';
//     });
// });
