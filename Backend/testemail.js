require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

sendEmail({
  to: 'arjungovind494@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email from your app',
  html: '<p>This is a test email from your app</p>',
}).then(() => {
  console.log('Test email sent successfully');
}).catch(console.error);
