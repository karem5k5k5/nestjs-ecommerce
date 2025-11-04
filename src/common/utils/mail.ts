import nodemailer from "nodemailer"

export const sendmail = async (mailOptions: nodemailer.SendMailOptions) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS
        }
    })

    await transporter.sendMail(mailOptions)
}