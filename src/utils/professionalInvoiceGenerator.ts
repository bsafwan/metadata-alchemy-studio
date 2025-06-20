
import jsPDF from 'jspdf';

interface InvoiceData {
  reference_number: string;
  amount: number;
  project_name: string;
  client_name: string;
  client_email: string;
  client_business: string;
  client_industry: string;
  due_date: string;
  created_date: string;
}

export const generateProfessionalInvoice = (invoiceData: InvoiceData): string => {
  const doc = new jsPDF();
  
  // Set up colors
  const primaryColor = [255, 140, 0] as const; // Orange
  const darkColor = [51, 51, 51] as const; // Dark gray
  const lightGray = [245, 245, 245] as const;
  
  // Header Background
  doc.setFillColor(255, 140, 0);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Company Logo Area (Orange box)
  doc.setFillColor(255, 255, 255);
  doc.rect(15, 8, 25, 25, 'F');
  doc.setFontSize(16);
  doc.setTextColor(255, 140, 0);
  doc.text('E', 27, 23);
  
  // Company Name
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text('ELISMET LTD', 50, 25);
  
  // Invoice Title
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('INVOICE', 150, 25);
  
  // Company Details Section
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  doc.text('Company Number: 16433590', 15, 50);
  doc.text('Office 12611, 182-184 High Street North', 15, 55);
  doc.text('East Ham, London, E6 2JA, United Kingdom', 15, 60);
  doc.text('Email: contact@elismet.com', 15, 65);
  doc.text('Phone: +44 7380480139', 15, 70);
  
  // Invoice Details Box
  doc.setFillColor(245, 245, 245);
  doc.rect(120, 45, 75, 30, 'F');
  doc.setFontSize(10);
  doc.setTextColor(51, 51, 51);
  doc.text('Invoice Number:', 125, 52);
  doc.setFont(undefined, 'bold');
  doc.text(invoiceData.reference_number, 125, 58);
  doc.setFont(undefined, 'normal');
  doc.text('Invoice Date:', 125, 64);
  doc.text(invoiceData.created_date, 125, 70);
  
  // Bill To Section
  doc.setFillColor(255, 140, 0);
  doc.rect(15, 85, 180, 8, 'F');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('BILL TO', 20, 91);
  
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'bold');
  doc.text(invoiceData.client_name, 20, 102);
  doc.setFont(undefined, 'normal');
  doc.text(`${invoiceData.client_business}`, 20, 108);
  doc.text(`Industry: ${invoiceData.client_industry}`, 20, 114);
  doc.text(invoiceData.client_email, 20, 120);
  
  // Service Details Table Header
  doc.setFillColor(255, 140, 0);
  doc.rect(15, 135, 180, 10, 'F');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('DESCRIPTION', 20, 142);
  doc.text('AMOUNT', 160, 142);
  
  // Service Details Row
  doc.setFillColor(255, 255, 255);
  doc.rect(15, 145, 180, 15, 'F');
  doc.setDrawColor(51, 51, 51);
  doc.rect(15, 145, 180, 15);
  doc.setTextColor(51, 51, 51);
  doc.text(`Project: ${invoiceData.project_name}`, 20, 152);
  doc.text('50% Project Payment (Milestone)', 20, 157);
  doc.setFont(undefined, 'bold');
  doc.text(`$${invoiceData.amount.toFixed(2)}`, 160, 155);
  
  // Total Amount Box
  doc.setFillColor(255, 140, 0);
  doc.rect(120, 170, 75, 20, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL AMOUNT', 125, 178);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text(`$${invoiceData.amount.toFixed(2)}`, 125, 185);
  
  // Payment Instructions Section
  doc.setFillColor(240, 248, 255);
  doc.rect(15, 200, 180, 60, 'F');
  doc.setDrawColor(30, 144, 255);
  doc.rect(15, 200, 180, 60);
  
  doc.setFontSize(12);
  doc.setTextColor(255, 140, 0);
  doc.setFont(undefined, 'bold');
  doc.text('PAYMENT INSTRUCTIONS', 20, 210);
  
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'normal');
  doc.text('Bank Name: Citibank', 20, 220);
  doc.text('Bank Address: 111 Wall Street, New York, NY 10043 USA', 20, 225);
  doc.text('Routing (ABA): 031100209', 20, 230);
  doc.text('SWIFT Code: CITIUS33', 20, 235);
  doc.text('Account Number: 70586980001243422', 20, 240);
  doc.text('Account Type: CHECKING', 20, 245);
  doc.text('Beneficiary Name: MD RABIULLAH', 20, 250);
  
  // Reference Number Highlight
  doc.setFillColor(255, 255, 0);
  doc.rect(15, 265, 180, 10, 'F');
  doc.setFontSize(10);
  doc.setTextColor(255, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text(`REFERENCE NUMBER: ${invoiceData.reference_number}`, 20, 272);
  doc.text('(Please include this reference number with your payment)', 20, 278);
  
  // Due Date
  doc.setFontSize(10);
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'normal');
  doc.text(`Due Date: ${invoiceData.due_date}`, 20, 290);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Thank you for your business! For any questions, please contact us at contact@elismet.com', 20, 300);
  
  return doc.output('datauristring');
};
