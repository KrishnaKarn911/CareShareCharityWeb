

document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('tokenCharity');
                window.location.href = 'http://localhost:3000/charitylife/user/login';
            });

            document.addEventListener('DOMContentLoaded', () => {
                const token = localStorage.getItem('tokenCharity');

                if (!token) {
                    alert("No token found, please login first.");
                    window.location.href = "http://localhost:3000/charitylife/user/login";
                    return;
                }

                loadCharities(token);

                document.getElementById('dashboardLink').addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('dashboardLink').classList.add('active');
                    document.getElementById('donationsLink').classList.remove('active');
                    document.getElementById('charitiesGrid').style.display = 'flex';
                    document.getElementById('donationsSection').style.display = 'none';
                });

                document.getElementById('donationsLink').addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('donationsLink').classList.add('active');
                    document.getElementById('dashboardLink').classList.remove('active');
                    document.getElementById('charitiesGrid').style.display = 'none';
                    document.getElementById('donationsSection').style.display = 'block';
                    loadDonations(token);
                });
            });

            async function loadCharities(token) {
                try {
                    const response = await axios.get('/charitylife/charity', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const charities = response.data;
                    const grid = document.getElementById('charitiesGrid');
                    grid.innerHTML = '';

                    charities.forEach(charity => {
                        const charityCard = document.createElement('div');
                        charityCard.className = 'col-md-4 mb-4';
                        charityCard.innerHTML = `
                        <div class="card">
                            <img src="${charity.image}" class="card-img-top" alt="${charity.name}">
                            <div class="card-body">
                                <h5 class="card-title">${charity.name}</h5>
                                <p class="card-text">${charity.description}</p>
                                <input type="number" class="form-control mb-2" placeholder="Enter amount to donate" id="donateAmount-${charity.id}">
                                <button class="btn btn-primary" onclick="donate(${charity.id})">Donate</button>
                            </div>
                        </div>`;
                        grid.appendChild(charityCard);
                    });
                } catch (error) {
                    console.error('Error loading charities:', error);
                }
            }

            async function loadDonations(token) {
                try {
                    const response = await axios.get('http://localhost:3000/charitylife/user/donations', {
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
                        <td>${donation.charityName}</td>
                        <td>${donation.amount}</td>
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



        async function donate(charityId) {
                let amountElement = document.getElementById(`donateAmount-${charityId}`);
                let amount = amountElement.value;
                
                const token = localStorage.getItem('tokenCharity');
                let parseToken = parseJwt(token);
                console.log(parseToken);
                

                if (!token) {
                    console.error('No token found');
                    return;
                }

                try {
                    const response = await axios.post('http://localhost:3000/charitylife/user/createOrder', {
                        charityId: charityId,
                        amount: amount
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const options = {
                        "key": response.data.key_id,
                        "name": "Donation",
                        "order_id": response.data.order.id,
                        "handler": async function (response) {
                            await axios.post('http://localhost:3000/charitylife/user/updateDonation', {
                                payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                signature: response.razorpay_signature,
                                charityId: charityId,
                                userId: parseToken.id,
                                amount: amount
                            }, {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            }).then((verificationResponse) => {
                                if (verificationResponse.data.status === "success") {
                                    alert('Payment verified successfully, Thank you for your donation');
                                } else {
                                    alert('Payment verification failed');
                                }
                            }).catch(error => {
                                console.error('Error verifying payment:', error);
                            });
                        },
                        "prefill": {
                            "name": "User Name",
                            "email": "user@example.com",
                            "contact": "9999999999"
                        },
                        "notes": {
                            "address": "User Address"
                        },
                        "theme": {
                            "color": "#3399cc"
                        }
                    };

                    const rzp1 = new Razorpay(options);
                    rzp1.on('payment.failed', function (response) {
                        alert(response.error.reason);
                    });

                    rzp1.open();
                } catch (error) {
                    console.error('Error creating order:', error);
                }
            } 


            function parseJwt(token) {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    return JSON.parse(jsonPayload);
                }