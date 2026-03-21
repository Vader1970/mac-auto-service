/**
 * Vercel Serverless Function — contact / booking form → Resend
 * Env: RESEND_API_KEY, RESEND_FROM, NOTIFICATION_EMAIL, SITE_URL (optional)
 */
import { Resend } from 'resend';

function escapeHtml(text) {
    if (text == null) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function readJsonBody(req) {
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
        return Promise.resolve(req.body);
    }
    if (Buffer.isBuffer(req.body)) {
        try {
            const str = req.body.toString('utf8');
            return Promise.resolve(str ? JSON.parse(str) : {});
        } catch {
            return Promise.resolve({});
        }
    }
    if (typeof req.body === 'string') {
        try {
            return Promise.resolve(req.body ? JSON.parse(req.body) : {});
        } catch {
            return Promise.resolve({});
        }
    }
    return new Promise((resolve, reject) => {
        let raw = '';
        req.on('data', (chunk) => {
            raw += chunk;
        });
        req.on('end', () => {
            try {
                resolve(raw ? JSON.parse(raw) : {});
            } catch (e) {
                reject(e);
            }
        });
        req.on('error', reject);
    });
}

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM;
    const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
    const SITE_URL = process.env.SITE_URL || 'https://www.macautoservices.co.nz';

    if (!RESEND_API_KEY) {
        console.error('Missing RESEND_API_KEY');
        return res.status(500).json({ message: 'Server configuration error' });
    }
    if (!RESEND_FROM || !NOTIFICATION_EMAIL) {
        console.error('Missing RESEND_FROM or NOTIFICATION_EMAIL');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    let data;
    try {
        data = await readJsonBody(req);
    } catch {
        return res.status(400).json({ message: 'Invalid JSON body' });
    }

    const { firstName, lastName, email, phone, service, message } = data;

    if (!firstName || !lastName || !email || !service) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const emailStr = String(email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    const resend = new Resend(RESEND_API_KEY);
    const fullName = `${String(firstName).trim()} ${String(lastName).trim()}`.trim();
    const phoneLine = phone ? String(phone).trim() : '—';
    const messageText = message != null && String(message).trim() ? String(message).trim() : '—';
    const serviceStr = String(service).trim();

    const textBlock = `
Name: ${fullName}
Email: ${emailStr}
Phone: ${phoneLine}
Requested service: ${serviceStr}

Message:
${messageText}
`.trim();

    const htmlBlock = `
        <h2>New website enquiry / booking</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(emailStr)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phoneLine)}</p>
        <p><strong>Requested service:</strong> ${escapeHtml(serviceStr)}</p>
        <h3>Message</h3>
        <p style="white-space:pre-wrap;">${escapeHtml(messageText)}</p>
    `;

    try {
        await resend.emails.send({
            from: RESEND_FROM,
            to: NOTIFICATION_EMAIL,
            replyTo: emailStr,
            subject: `Website enquiry — ${serviceStr} — ${fullName}`,
            text: textBlock,
            html: htmlBlock,
        });

        await resend.emails.send({
            from: RESEND_FROM,
            to: emailStr,
            subject: 'Thank you — Mac Auto Services received your message',
            text: `
Hi ${String(firstName).trim()},

Thank you for contacting Mac Auto Services. We've received your enquiry and will get back to you as soon as we can.

Here's a copy of what you sent us:

${textBlock}

---
Mac Auto Services
(03) 925 9349
mac.autoservices@hotmail.com
Unit 1&2/56 Wickham Street, Bromley, Christchurch 8062

${SITE_URL}
            `.trim(),
            html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1a1a1a;">Thank you for contacting us</h2>
          <p>Hi ${escapeHtml(String(firstName).trim())},</p>
          <p>Thank you for getting in touch with <strong>Mac Auto Services</strong>. We've received your message and our team will respond as soon as possible.</p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 6px; margin: 24px 0;">
            <h3 style="margin-top: 0; color: #1a1a1a;">Your details</h3>
            <p style="margin: 8px 0;"><strong>Service:</strong> ${escapeHtml(serviceStr)}</p>
            <p style="margin: 8px 0; white-space: pre-wrap;">${escapeHtml(messageText)}</p>
          </div>

          <p>Best regards,<br /><strong>Mac Auto Services</strong></p>

          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #555;">
            <p style="margin: 4px 0;">📞 (03) 925 9349</p>
            <p style="margin: 4px 0;">✉️ mac.autoservices@hotmail.com</p>
            <p style="margin: 4px 0;">📍 Unit 1&2/56 Wickham Street, Bromley, Christchurch 8062</p>
            <p style="margin-top: 12px;"><a href="${escapeHtml(SITE_URL)}" style="color: #c4b800;">Visit our website</a></p>
          </div>
        </div>
      `,
        });

        return res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Resend / form error:', error);
        return res.status(500).json({ message: 'Failed to send email. Please try again or call us.' });
    }
}
