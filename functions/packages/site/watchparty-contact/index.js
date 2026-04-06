const FormData = require("form-data");
const Mailgun = require("mailgun.js");

const MAILGUN_DOMAIN = "mg.wademinter.com";
const RECIPIENT = "wade@wademinter.com";
const REDIRECT_URL = "https://watchparty.app/thanks";

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

  const { name, email, message, organization } = args;

  // Basic validation
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: { "content-type": "text/html" },
      body: "<html><body><h1>Missing required fields</h1><p>Name, email, and message are all required.</p><p><a href='https://watchparty.app/#contact'>Go back</a></p></body></html>",
    };
  }

  // Send via Mailgun
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || args.MAILGUN_API_KEY,
  });

  const orgLine = organization ? `Organization: ${organization}\n` : "";

  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Watch Party Games <postmaster@${MAILGUN_DOMAIN}>`,
      to: RECIPIENT,
      subject: `[Watch Party Games] ${name}${organization ? ` — ${organization}` : ""}`,
      "h:Reply-To": email,
      text: `Name: ${name}\nEmail: ${email}\n${orgLine}\nMessage:\n${message}`,
    });

    return redirect(REDIRECT_URL);
  } catch (err) {
    console.error("Mailgun error:", err);
    return {
      statusCode: 500,
      headers: { "content-type": "text/html" },
      body: "<html><body><h1>Something went wrong</h1><p>Your message could not be sent. Please try emailing hello@watchparty.app directly.</p><p><a href='https://watchparty.app/#contact'>Go back</a></p></body></html>",
    };
  }
}

exports.main = main;
