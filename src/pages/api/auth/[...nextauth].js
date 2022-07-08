import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../../lib/prisma';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path from 'path';
const {google} = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID, 
    process.env.GOOGLE_SECRET,
    'https://developers.google.com/oauthplayground'
)
 oauth2Client.setCredentials({
    refresh_token:process.env.GOOGLE_REFRESH_TOKEN
})
const accessToken = oauth2Client.getAccessToken();

// const OAuth2_client = new OAuth(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET)
// const token = OAuth2_client.setCredentials({refreshToken: process.env.GOOGLE_REFRESH_TOKEN})
// // Email sender
// const accessToken = OAuth2_client.getAccessToken()
const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_SERVER_HOST,
//   port: process.env.EMAIL_SERVER_PORT,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_SERVER_USER,
//     pass: process.env.EMAIL_SERVER_PASSWORD,
//   },
//   secure: true,
service: 'gmail',
host: process.env.EMAIL_SERVER_HOST,
port: 587,//465,
secure: false,
auth: {
    type: 'OAuth2',
    user: 'justbrenn2@gmail.com',
    clientId: process.env.GOOGLE_ID,
    accessToken,
    clientSecret:process.env.GOOGLE_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN

}
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = ({ identifier, url }) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8',
  });
  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"Surplus List" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: 'Your sign-in link for Surplus List',
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

const sendWelcomeEmail = async ({ user }) => {
  const { email } = user;

  try {
    const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"Surplus List" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: 'Welcome to Surplus List!',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        support_email: 'justin.brenner@forgetechnologysolutions.com',
      }),
    });
  } catch (error) {
    // console.log(`❌ Unable to send welcome email to user (${email})`);
  }
};

export default NextAuth({
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
  },
  providers: [
    EmailProvider({
      maxAge: 10 * 60,
      sendVerificationRequest,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  events: { createUser: sendWelcomeEmail },
});
