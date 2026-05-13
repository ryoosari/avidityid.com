import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG, DOWNLOAD_CONFIG } from '@/lib/constants';
import { OrderDetails, DownloadLink } from '@/types/common';

if (typeof window !== 'undefined' && EMAIL_CONFIG.publicKey) {
  emailjs.init(EMAIL_CONFIG.publicKey);
}

export function generateDownloadLinks(items: any[]): DownloadLink[] {
  const expiresAt = new Date(
    Date.now() + DOWNLOAD_CONFIG.expirationHours * 60 * 60 * 1000
  ).toISOString();

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return items.flatMap(item => {
    const files: string[] = item.product?.download_files || [];
    return files.map(filename => ({
      productTitle: item.product.title,
      downloadUrl: `${origin}/downloads/${filename}`,
      expiresAt,
    }));
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
