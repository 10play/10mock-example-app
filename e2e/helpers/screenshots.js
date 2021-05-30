/* eslint-disable no-undef */
import NativePixelMatch from './pixelMatch';
import {delay} from './funcs';

const nodemailer = require('nodemailer');
const fs = require('fs');

const base64Encode = (file) => {
  const bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString('base64');
};

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'hi828782@gmail.com',
    pass: '123hibyehi',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const screenshotConfig = new NativePixelMatch(
  'temp',
  'shots',
  'screenshot_testing',
  'detox',
);
export const debugScreenshot = async (name, folder, debug = false) => {
  let base64str;
  if (debug) {
    screenshotConfig.createScreenshot(name, folder);
    base64str = base64Encode(`screenshot_testing/temp/${folder}/${name}.png`);
  } else {
    base64str = base64Encode(
      `screenshot_testing/temp/${folder}/diff-${name}.png`,
    );
  }

  const mailOptions = {
    from: 'testing workflow',

    replyto: 'no reply',
    to: 'shahar.e3@gmail.com, guy353@gmail.com',
    subject: `${name} screenshot`,
    html: `<p>This is the ${name} from ${folder} collection</p>
    <p>Have a look</p>`,
    attachments: [
      {
        filename: `${name}.png`,
        contentType: 'image/png',
        content: Buffer.from(base64str, 'base64'),
      },
    ],
  };
  try {
    smtpTransport.sendMail(mailOptions, (error) => {
      if (error) {
        console.log('error', error);
      } else {
        console.log('Success');
      }
      smtpTransport.close();
    });
  } catch {
    console.log('unable to send mail');
  }
};

export const testScreenshot = async (name, folder, options = {}) => {
  const {delaySecs = 0.5, pixelFlexibility = null} = options;
  await delay(delaySecs);
  console.log(`Debug: Take screenshots ${name} Date: ${new Date()}`);
  await screenshotConfig.createScreenshot(name, folder);
  try {
    console.log(`Debug: Diff screenshots ${name} Date: ${new Date()}`);
    screenshotConfig.pixelDiff(name, folder, pixelFlexibility);
  } catch (e) {
    throw new Error(e.message);
  }
  await delay(0.5);
};
