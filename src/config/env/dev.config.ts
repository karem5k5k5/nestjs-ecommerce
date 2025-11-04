export default () => ({
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    nodemailer_email: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
    jwt_secret: process.env.JWT_SECRET
})