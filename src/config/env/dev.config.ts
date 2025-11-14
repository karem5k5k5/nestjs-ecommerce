export default () => ({
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    nodemailer_email: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
    jwt_secret: process.env.JWT_SECRET,
    admin_secret: process.env.ADMIN_SECRET_KEY
})