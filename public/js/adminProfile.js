var token = localStorage.getItem('tokenCharity');

const socket = io('http://localhost:3000'); 

        socket.on('charityRegistered', (data) => {
            addNotification(data);
        });

        document.addEventListener('DOMContentLoaded', async() => {
            try{
                const response = await axios.get('http://localhost:3000/charitylife/charity/pending')
                console.log(response);
                if(response.status===200){
                    response.data.forEach(charity=>addNotification(charity));
                }else{
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
            window.location.href = 'http://localhost:3000/charitylife/user/login'; 
        });

    document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userLink').addEventListener('click', loadUsers);
    document.getElementById('charityLink').addEventListener('click', loadCharities);
    document.getElementById('donationsLink').addEventListener('click', loadDonations);
    document.getElementById('dashboardLink').addEventListener('click',()=>{
        location.reload(); 
    })

    let deleteId = null;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    confirmDeleteBtn.addEventListener('click', function() {
        if (deleteId) {
            deleteItem(deleteId);
            deleteModal.hide();
        }
    });

    async function loadUsers() {
        try {
            const response = await axios.get('http://localhost:3000/charitylife/user/',{
            headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            console.log(response.data.users)
        displayTable(response.data.users, 'Users');
        } catch (error) {
            console.log(error);
        }
    }

    async function loadCharities() {
         try {
            const response = await axios.get('http://localhost:3000/charitylife/charity/',{
            headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            console.log(response.data)
        displayTable(response.data, 'Users');
        } catch (error) {
            console.log(error);
        }
    }

    async function loadDonations() {
        try {
            const response = await axios.get('http://localhost:3000/charitylife/admin/allDonations',{
            headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            console.log(response.data)
        displayTable(response.data, 'Users');
        } catch (error) {
            console.log(error);
        }
    }

    function displayTable(data, type) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    if (data.length === 0) {
        contentDiv.textContent = `No ${type} found.`;
        return;
    }

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');

    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
        headerRow.appendChild(th);
    });
    
    const th = document.createElement('th');
    th.textContent = 'Actions';
    headerRow.appendChild(th);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        const actionTd = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            deleteId = item.id;
            deleteModal.show();
        });
        actionTd.appendChild(deleteBtn);
        row.appendChild(actionTd);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table);
}


    function deleteItem(id) {
        axios.delete(`/api/${type.toLowerCase()}/${id}`)
            .then(response => {
                // Refresh the list
                if (type === 'Users') {
                    loadUsers();
                } else if (type === 'Charities') {
                    loadCharities();
                } else if (type === 'Donations') {
                    loadDonations();
                }
            })
            .catch(error => {
                console.error('There was an error deleting the item!', error);
            });
    }
});
