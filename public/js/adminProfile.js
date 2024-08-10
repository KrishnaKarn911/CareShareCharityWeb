var token = localStorage.getItem('tokenCharity');


//It will handle realtime notification on approval and rejection of charity registration
const socket = io('http://43.205.236.91:3000'); 

socket.on('charityRegistered', (data) => {
     addNotification(data);
});

document.addEventListener('DOMContentLoaded', async() => {
     try{
        const response = await axios.get('http://43.205.236.91:3000/charitylife/charity/pending')
        console.log(response);
        if(response.status===200){
        response.data.forEach(charity=>addNotification(charity));
        }
        else
            {
              alert('Server Error, try after sometime');
              console.log('Something went wrong')
            }
        }catch(err){
                console.log(err);
         }
});

function addNotification(data) {
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.classList.add('alert', 'alert-info', 'notification');
    notification.innerHTML = `
                <strong>New Charity Registered:</strong>
                <p><b>${data.name}</b>: ${data.description}</p>
                <button class="btn btn-success me-2" onclick="approveCharity(${data.id})">Approve</button>
                <button class="btn btn-danger" onclick="rejectCharity(${data.id})">Reject</button>
            `;
    notifications.appendChild(notification);
}

function approveCharity(id) {
    fetch(`/charitylife/admin/approveCharity/${id}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
            alert('Charity approved successfully');
            location.reload(); 
        })
        .catch(err => console.error(err));
}



function rejectCharity(id) {
    fetch(`/charitylife/admin/rejectCharity/${id}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
                alert('Charity rejected successfully');
                location.reload(); 
            })
            .catch(err => console.error(err));
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('tokenCharity');
    window.location.href = 'http://43.205.236.91:3000/charitylife/user/login'; 
});



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userLink').addEventListener('click', loadUsers);
    document.getElementById('charityLink').addEventListener('click', loadCharities);
    document.getElementById('donationsLink').addEventListener('click', loadDonations);
    document.getElementById('dashboardLink').addEventListener('click',()=>{
        location.reload(); 
    })


    async function loadUsers() {
        try {
            const response = await axios.get('http://43.205.236.91:3000/charitylife/user/',{
            headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            console.log(response.data)
        displayTable(response.data, 'user');
        } catch (error) {
            console.log(error);
        }
    }

    async function loadCharities() {
         try {
            const response = await axios.get('http://43.205.236.91:3000/charitylife/charity/',{
            headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            console.log(response.data)
        displayTable(response.data, 'charity');
        } catch (error) {
            console.log(error);
        }
    }

    async function loadDonations() {
        try {
            const response = await axios.get('http://43.205.236.91:3000/charitylife/admin/allDonations',{
            headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            console.log(response.data)
        displayTable(response.data, 'donation');
        } catch (error) {
            console.log(error);
        }
    }

    function displayTable(data, type) {
    console.log(data);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    if (data.length === 0) {
        contentDiv.textContent = `No ${type} found.`;
        return;
    }

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Dynamically create header cells based on keys in the first object
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table);
}


});
