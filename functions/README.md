# Contact Form — DigitalOcean Function

Serverless function that handles the contact form on wademinter.com. Receives form submissions and sends email via Mailgun.

## Setup

### 1. Install the DO CLI

```sh
brew install doctl
doctl auth init
```

### 2. Connect to your Functions namespace

```sh
doctl serverless connect
```

### 3. Set your Mailgun API key

Create a `.env` file in the `functions/` directory (this file is gitignored):

```sh
echo "MAILGUN_API_KEY=your-mailgun-api-key" > functions/.env
```

### 4. Deploy

```sh
cd functions
doctl serverless deploy .
```

The `project.yml` references `${MAILGUN_API_KEY}` which DO substitutes from the `.env` file at deploy time.

### 5. Verify deployment

```sh
doctl serverless functions get site/contact --url
```

The function is mapped to `https://function.wademinter.com/site/contact` via the namespace `fn-9c0cb262-5a87-4b3f-affc-e4f730ee927b` (NYC1).

## How it works

1. Form POSTs name, email, message, and a honeypot field (`_gotcha`)
2. If the honeypot is filled, silently redirects (bot caught)
3. Validates that name, email, and message are present
4. Sends email via Mailgun with Reply-To set to the submitter's address
5. Redirects to /thanks on success
