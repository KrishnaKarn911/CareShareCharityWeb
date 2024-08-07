const Sib = require('sib-api-v3-sdk');


const sendEmail = async options =>{

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    
    apiKey.apiKey = process.env.SIB_KEY_ID

    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: "krishnakarn911@gmail.com"
    }
    const receivers=[{
        email: options.email,
    }
    ]

    const data = await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Charity Donation",
        textContent: options.message,
    })
   return data;
}

module.exports = sendEmail;