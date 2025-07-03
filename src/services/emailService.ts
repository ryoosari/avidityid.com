import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG, DOWNLOAD_CONFIG } from '@/lib/constants';
import { OrderDetails, DownloadLink, DownloadToken } from '@/types/common';

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAIL_CONFIG.publicKey);
}

export function generateDownloadToken(): string {
  return btoa(Date.now() + Math.random().toString()).replace(/[^a-zA-Z0-9]/g, '');
}

export function generateDownloadLinks(items: any[]): DownloadLink[] {
  const expiresAt = new Date(
    Date.now() + DOWNLOAD_CONFIG.expirationHours * 60 * 60 * 1000
  ).toISOString();
  
  return items.map(item => {
    const token = generateDownloadToken();
    const downloadUrl = `${window.location.origin}/download/${item.productId}?token=${token}&expires=${expiresAt}`;
    
    // Store download token
    const downloadTokens = JSON.parse(localStorage.getItem('downloadTokens') || '{}');
    downloadTokens[token] = {
      productId: item.productId,
      expires: expiresAt,
      used: false,
    };
    localStorage.setItem('downloadTokens', JSON.stringify(downloadTokens));
    
    return {
      productTitle: item.product.title,
      downloadUrl,
      expiresAt,
    };
  });
}

export async function sendDownloadEmail(orderDetails: OrderDetails): Promise<boolean> {
  try {
    const downloadLinks = generateDownloadLinks(orderDetails.items);
    
    const templateParams = {
      to_email: orderDetails.payerEmail,
      customer_name: orderDetails.customerName,
      order_id: orderDetails.orderId,
      order_date: new Date(orderDetails.timestamp).toLocaleDateString(),
      order_total: orderDetails.amount.toFixed(2),
      download_links: downloadLinks.map(link => 
        `${link.productTitle}: ${link.downloadUrl}`
      ).join('\n'),
      expiration_date: new Date(
        Date.now() + DOWNLOAD_CONFIG.expirationHours * 60 * 60 * 1000
      ).toLocaleDateString(),
      items_list: orderDetails.items.map(item => 
        `${item.product.title} - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n')
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export function verifyDownloadToken(token: string, productId: string): boolean {
  const downloadTokens = JSON.parse(localStorage.getItem('downloadTokens') || '{}');
  const tokenData: DownloadToken = downloadTokens[token];
  
  if (!tokenData) return false;
  if (tokenData.productId !== productId) return false;
  if (new Date() > new Date(tokenData.expires)) return false;
  if (tokenData.used) return false;
  
  return true;
}

export function markTokenAsUsed(token: string): void {
  const downloadTokens = JSON.parse(localStorage.getItem('downloadTokens') || '{}');
  if (downloadTokens[token]) {
    downloadTokens[token].used = true;
    localStorage.setItem('downloadTokens', JSON.stringify(downloadTokens));
  }
}