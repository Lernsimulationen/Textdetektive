import QRCode from 'qrcode';

export class QRCodeService {
  /**
   * Generates a QR Code as an SVG string (100% offline, zero network requests)
   */
  static async generateSVG(text: string): Promise<string> {
    try {
      return await QRCode.toString(text, {
        type: 'svg',
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      });
    } catch (err) {
      console.error('Failed to generate QR Code SVG', err);
      return `<svg viewBox="0 0 100 100"><text x="10" y="50" fill="red">QR Fehler</text></svg>`;
    }
  }

  /**
   * Generates a QR Code as a base64 Data URL for img tags
   */
  static async generateDataURL(text: string): Promise<string> {
    try {
      return await QRCode.toDataURL(text, {
        margin: 1,
        width: 300,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      });
    } catch (err) {
      console.error('Failed to generate QR Code Data URL', err);
      return '';
    }
  }
}
