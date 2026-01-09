# EmailJS Setup Instructions

This contact form can send emails directly using EmailJS. Follow these steps to set it up:

## Step 1: Install EmailJS

```bash
npm install @emailjs/browser
```

## Step 2: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 3: Set Up Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your email account (sajudhamza@gmail.com)
5. Copy the **Service ID**

## Step 4: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template:

**Subject:**
```
{{subject}}
```

**Content:**
```
You have a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Inquiry Type: {{inquiry_type}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Copy the **Template ID**

## Step 5: Get Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key**

## Step 6: Update ContactForm.jsx

Open `src/components/ContactForm.jsx` and replace these values:

```javascript
const SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

## Step 7: Test

1. Run `npm run dev`
2. Fill out the contact form
3. Submit and check your email (sajudhamza@gmail.com)

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic email templates
- Gmail, Outlook, and other popular providers

For more emails, consider upgrading to a paid plan.

## Fallback

If EmailJS is not configured, the form will automatically fall back to opening the user's default email client with a pre-filled message.

