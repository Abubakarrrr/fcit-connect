export const OTPVerificationTemplate = (otp) => {
  return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>OTP Verification Email</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;p
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
              <div class="message">OTP Verification Email</div>
              <div class="body">
                  <p>Dear User,</p>
                  <p>Thank you for registering with FCIT CONNECT. To complete your registration, please use the following OTP
                      (One-Time Password) to verify your account:</p>
                  <h2 class="highlight">${otp}</h2>
                  <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
                  Once your account is verified, you will have access to our platform and its features.</p>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                      href="mailto:abubakkeramjad10@gmail.com">abubakkeramjad10@gmail.com</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`;
};

export const PasswordResetTemplate = (resetURL) => {
  return ` 
      <!DOCTYPE html> 
      <html lang="en"> 
      <head>   
        <meta charset="UTF-8">   
        <meta name="viewport" content="width=device-width, initial-scale=1.0">   
        <title>Reset Your Password</title> 
      </head> 
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">   
        <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">     
          <h1 style="color: white; margin: 0;">Password Reset</h1>   
        </div>   
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">     
          <p>Hello,</p>     
          <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>     
          <p>To reset your password, click the button below:</p>     
          <div style="text-align: center; margin: 30px 0;">       
            <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>     
          </div>     
          <p>This link will expire in 1 hour for security reasons.</p>     
          <p>Best regards,<br>Your App Team</p>   
        </div>   
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">     
          <p>This is an automated message, please do not reply to this email.</p>   
        </div> 
      </body> 
      </html>`;
};

export const generateUserCreationEmail = (username, email, password, role) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background: #0073e6;
                  color: white;
                  text-align: center;
                  padding: 15px;
                  font-size: 20px;
                  font-weight: bold;
                  border-radius: 8px 8px 0 0;
              }
              .content {
                  padding: 20px;
                  font-size: 16px;
                  color: #333;
              }
              .footer {
                  margin-top: 20px;
                  text-align: center;
                  font-size: 14px;
                  color: #777;
              }
              .details {
                  background: #f9f9f9;
                  padding: 15px;
                  border-radius: 5px;
                  margin-top: 10px;
              }
              .details p {
                  margin: 5px 0;
              }
              .button {
                  display: inline-block;
                  padding: 10px 15px;
                  margin-top: 15px;
                  background: #0073e6;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">Welcome to Our Platform</div>
              <div class="content">
                  <p>Dear <b>${username}</b>,</p>
                  <p>Your account has been successfully created. Below are your account details:</p>
                  <div class="details">
                      <p><b>Email:</b> ${email}</p>
                      <p><b>Password:</b> ${password}</p>
                      <p><b>Role:</b> ${role}</p>
                  </div>
                  <p>You can now log in and start using our platform.</p>
                  <p><a href="http://localhost:5173/login" class="button">Login Now</a></p>
              </div>
              <div class="footer">
                  If you have any questions, feel free to contact our support team.
              </div>
          </div>
      </body>
      </html>`;
};