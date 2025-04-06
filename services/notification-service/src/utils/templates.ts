export const emailVerificationTemplate = (redirectLink: string) => {
  return `<div
  style="
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    color: #333333;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
  "
>
  <div style="text-align: center">
    <img
      src="https://firebasestorage.googleapis.com/v0/b/dev-store-1865e.appspot.com/o/assets%2Fimages%2Flogo.png?alt=media&token=994b53da-615c-417c-86ec-b58cf4642a9f"
      alt="App Logo"
      width="80"
      height="80"
      style="margin-bottom: 20px"
    />
  </div>

  <hr
    style="border: none; border-top: 1px solid #e0e0e0; margin-bottom: 20px"
  />

  <h2 style="margin-top: 0">Please verify your email</h2>
  <p style="font-size: 14px">
    Thank you for signing up! Please verify your email address by clicking the
    button below:
  </p>
  <div style="text-align: center; margin: 30px">
    <a
      href="${redirectLink}"
      style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #4f46e5;
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        text-align: center;
        box-sizing: border-box;
        margin: 0 auto;
      "
      target="_blank"
      >Verify Email</a
    >
  </div>
  <div style="font-size: 14px">
    <p>This link will expire in 24 hours.</p>
    <p>If you didn’t request this, you can safely ignore this email.</p>
    <br />
    <p>Best,</p>
    <p>Devstore Team</p>
  </div>
</div>
`
}
