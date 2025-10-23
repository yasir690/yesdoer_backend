const emailTemplates = {
  verificationLink: (verifyUrl) => `
    <div
      style="padding:20px 20px 40px 20px; position: relative; overflow: hidden; width: 100%;"
    >
      <div style="z-index:1; position: relative;">
      <header style="padding-bottom: 20px">
        <div class="logo" style="text-align:center;">
        </div>
      </header>
      <main
        style="padding: 20px; background-color: #f5f5f5; border-radius: 10px; width: 80%; margin: 0 auto; margin-bottom: 20px; font-family: 'Poppins', sans-serif;"
      >
        <h1
          style="color: #fd6835; font-size: 30px; font-weight: 700;"
        >Welcome To Yesdoer</h1>
        <p
          style="font-size: 24px; text-align: left; font-weight: 500; font-style: italic;"
        >Hi,</p>
        <p
          style="font-size: 20px; text-align: left; font-weight: 500;"
        >Thank you for registering with us. Please click the button below to verify your email address.</p>

        <div style="text-align:center; margin: 30px 0;">
          <a
            href="${verifyUrl}"
            style="background-color: #fd6835; color: #fff; padding: 15px 30px; border-radius: 8px; font-size: 18px; text-decoration: none; font-weight: 600;"
          >
            Verify Email
          </a>
        </div>

        <p style="font-size: 16px; color: #343434; text-align:center;">
          Or copy and paste this link into your browser:<br/>
          <a href="${verifyUrl}" style="color:#a87628; word-break:break-all;">${verifyUrl}</a>
        </p>

        <p style="font-size: 16px; font-style:italic; color: #343434; margin-top: 20px;">If you did not request this email, kindly ignore this. If this is a frequent occurrence, 
          <a style="color: #a87628; text-decoration: none; border-bottom: 1px solid #a87628;" href="#">let us know.</a>
        </p>

        <p style="font-size: 20px;">Regards,</p>
        <p style="font-size: 20px;">Dev Team</p>
      </main>
      </div>
    <div>
  `
};

module.exports=emailTemplates;