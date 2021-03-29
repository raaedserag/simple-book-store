const mailer = require("nodemailer");
const nodemailerNTLMAuth = require('nodemailer-ntlm-auth');



module.exports.sendMail = async (data,users,titlee)=>{
  
  var transporter = mailer.createTransport({
    host: "mail.damen.com.eg",
    port: 587,
    secureConnection: true,
    tls: {
        ciphers: 'SSLv3'
    },
    ignoreTLS :true,
    greetingTimeout : 2000*60,
    socketTimeout: 10*60*1000,
    auth: {
        type: 'custom',
        method: 'NTLM',
        user: 'damen@damen.com.eg',
        pass: 'P@ss13579'
    },
    customAuth: {
        NTLM: nodemailerNTLMAuth
    },
     logger :true,
     debuger:true
  
  });
    var mailOptions = {
      from: 'damen@damen.com.eg',
      to: users,
      subject: titlee,
      text : data
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw new Error(error);
      } else {
        return true;
      }
    });    

}
  

      
       