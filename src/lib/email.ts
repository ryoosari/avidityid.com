import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

interface OrderDetails {
  orderId: string;
  amount: number;
  items: any[];
  timestamp: string;
  payerEmail: string;
  customerName: string;
}

interface DownloadLink {
  productTitle: string;
  downloadUrl: string;
  expiresAt: string;
}

// Generate secure download token
export function generateDownloadToken(): string {
  return btoa(Date.now() + Math.random().toString()).replace(/[^a-zA-Z0-9]/g, '');
}

// Generate time-limited download links
export function generateDownloadLinks(items: any[]): DownloadLink[] {
  const expirationHours = 48; // Links expire in 48 hours
  const expiresAt = new Date(Date.now() + expirationHours * 60 * 60 * 1000).toISOString();
  
  return items.map(item => {
    const token = generateDownloadToken();
    const downloadUrl = `${window.location.origin}/download/${item.productId}?token=${token}&expires=${expiresAt}`;
    
    // Store download token in localStorage for verification
    const downloadTokens = JSON.parse(localStorage.getItem('downloadTokens') || '{}');
    downloadTokens[token] = {
      productId: item.productId,
      expires: expiresAt,
      used: false
    };
    localStorage.setItem('downloadTokens', JSON.stringify(downloadTokens));
    
    return {
      productTitle: item.product.title,
      downloadUrl,
      expiresAt
    };
  });
}

// Send download email via EmailJS
export async function sendDownloadEmail(orderDetails: OrderDetails): Promise<boolean> {
  try {
    const downloadLinks = generateDownloadLinks(orderDetails.items);
    
    // Prepare email template parameters
    const templateParams = {
      to_email: orderDetails.payerEmail,
      customer_name: orderDetails.customerName,
      order_id: orderDetails.orderId,
      order_date: new Date(orderDetails.timestamp).toLocaleDateString(),
      order_total: orderDetails.amount.toFixed(2),
      download_links: downloadLinks.map(link => 
        `${link.productTitle}: ${link.downloadUrl}`
      ).join('\n'),
      expiration_date: new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString(),
      items_list: orderDetails.items.map(item => 
        `${item.product.title} - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n')
    };

    console.log('Sending email with parameters:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

// Verify download token
export function verifyDownloadToken(token: string, productId: string): boolean {
  const downloadTokens = JSON.parse(localStorage.getItem('downloadTokens') || '{}');
  const tokenData = downloadTokens[token];
  
  if (!tokenData) {
    return false;
  }
  
  // Check if token matches product and hasn't expired
  if (tokenData.productId !== productId) {
    return false;
  }
  
  if (new Date() > new Date(tokenData.expires)) {
    return false;
  }
  
  if (tokenData.used) {
    return false; // Token already used (optional: allow multiple downloads)
  }
  
  return true;
}

// Mark token as used (optional)
export function markTokenAsUsed(token: string): void {
  const downloadTokens = JSON.parse(localStorage.getItem('downloadTokens') || '{}');
  if (downloadTokens[token]) {
    downloadTokens[token].used = true;
    localStorage.setItem('downloadTokens', JSON.stringify(downloadTokens));
  }
} 