const FormData = require("form-data");
const Mailgun = require("mailgun.js");

const MAILGUN_DOMAIN = "mg.wademinter.com";
const RECIPIENT = "wade@wademinter.com";
const REDIRECT_URL = "https://wademinter.com/thanks";

function redirect(url) {
  return {
    statusCode: 302,
    headers: { location: url },
    body: "",
  };
}

async function main(args) {
  // Honeypot check — if this field has a value, it's a bot
  if (args._gotcha) {
    return redirect(REDIRECT_URL);
  }

  const { name, email, message } = args;

  // Basic validation
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: { "content-type": "text/html" },
      body: "<html><body><h1>Missing required fields</h1><p>Name, email, and message are all required.</p><p><a href='https://wademinter.com/contact'>Go back</a></p></body></html>",
    };
  }

  // Send via Mailgun
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || args.MAILGUN_API_KEY,
  });

  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `wademinter.com Contact Form <postmaster@${MAILGUN_DOMAIN}>`,
      to: RECIPIENT,
      subject: `Contact form: ${name}`,
      "h:Reply-To": email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return redirect(REDIRECT_URL);
  } catch (err) {
    console.error("Mailgun error:", err);
    return {
      statusCode: 500,
      headers: { "content-type": "text/html" },
      body: "<html><body><h1>Something went wrong</h1><p>Your message could not be sent. Please try emailing wade AT wademinter DOT com directly.</p><p><a href='https://wademinter.com/contact'>Go back</a></p></body></html>",
    };
  }
}

exports.main = main;
