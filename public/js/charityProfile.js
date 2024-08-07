document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('tokenCharity_Institute');
                window.location.href = 'http://65.2.126.107:3000/charitylife/charity/login';
            });
        document.addEventListener("DOMContentLoaded", function () {
            const token = localStorage.getItem('tokenCharity_Institute');

            if (!token) {
                alert("No token found, please login first.");
                window.location.href = "http://65.2.126.107:3000/charitylife/charity/login";
                return;
            }

            axios.get('http://65.2.126.107:3000/charitylife/charity/charityDetails', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    const charity = response.data.charityDetails;
                    const charityDetailsDiv = document.getElementById('charityDetails');
                    charityDetailsDiv.innerHTML = `
                        <h3>${charity.name}</h3>
                        <p>Status: <span class="${charity.approved ? 'text-success' : 'text-danger'}">
                            ${charity.approved ? 'Approved' : 'Not Approved'}
                        </span></p>
                        <img src="${charity.image}" style="max-width: 300px; height: auto;">
                        <p>${charity.description}</p>
                    `;
                })
                .catch(error => {
                    console.error('There was an error fetching the charity details!', error);
                    alert("Failed to fetch charity details. Please try again.");
                });
        });

        document.getElementById('dashboardLink').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('dashboardLink').classList.add('active');
            document.getElementById('donationsLink').classList.remove('active');
            document.getElementById('charityDetails').style.display = 'block';
            document.getElementById('notifications').style.display = 'none';
        });

        document.getElementById('donationsLink').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('donationsLink').classList.add('active');
            document.getElementById('dashboardLink').classList.remove('active');
            document.getElementById('charityDetails').style.display = 'none';
            document.getElementById('notifications').style.display = 'block';
            loadDonations();
        });

        async function loadDonations() {
            try {
                const token = localStorage.getItem('tokenCharity_Institute');
                const response = await axios.get('http://65.2.126.107:3000/charitylife/charity/donations', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const donations = response.data;
                const donationsTable = document.getElementById('donationsTable');
                donationsTable.innerHTML = '';

                donations.forEach(donation => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${donation.username}</td>
                        <td>${donation.amount}</td>
                        <td>${donation.paymentId}</td>
                        <td>${new Date(donation.date).toLocaleDateString()}</td>`;
                    donationsTable.appendChild(row);
                });

                document.getElementById('downloadJsonBtn').addEventListener('click', () => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(donations));
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", dataStr);
                    downloadAnchorNode.setAttribute("download", "donations.json");
                    document.body.appendChild(downloadAnchorNode); // required for firefox
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                });

            } catch (error) {
                console.error('Error loading donations:', error);
            }
        }