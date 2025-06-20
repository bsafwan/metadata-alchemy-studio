
import jsPDF from 'jspdf';

interface InvoiceData {
  reference_number: string;
  amount: number;
  phase_name: string;
  project_name: string;
  client_name: string;
  client_email: string;
  due_date: string;
  created_date: string;
}

export const generateInvoicePDF = (invoiceData: InvoiceData): string => {
  const doc = new jsPDF();
  
  // Company header
  doc.setFontSize(24);
  doc.setTextColor(255, 140, 0); // Orange color
  doc.text('ELISMET LTD', 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Company Number: 16433590', 20, 40);
  doc.text('Office 12611 182-184 High Street North', 20, 45);
  doc.text('East Ham, London, E6 2JA, United Kingdom', 20, 50);
  doc.text('Email: contact@elismet.com', 20, 55);
  doc.text('Phone: +44 7380480139', 20, 60);
  
  // Invoice title
  doc.setFontSize(20);
  doc.setTextColor(255, 140, 0);
  doc.text('PAYMENT INVOICE', 20, 80);
  
  // Invoice details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Invoice Reference: ${invoiceData.reference_number}`, 20, 95);
  doc.text(`Invoice Date: ${invoiceData.created_date}`, 20, 105);
  doc.text(`Due Date: ${invoiceData.due_date}`, 20, 115);
  
  // Client details
  doc.setFontSize(14);
  doc.setTextColor(255, 140, 0);
  doc.text('BILL TO:', 20, 135);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`${invoiceData.client_name}`, 20, 145);
  doc.text(`${invoiceData.client_email}`, 20, 155);
  
  // Service details
  doc.setFontSize(14);
  doc.setTextColor(255, 140, 0);
  doc.text('SERVICE DETAILS:', 20, 175);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Project: ${invoiceData.project_name}`, 20, 185);
  doc.text(`Phase: ${invoiceData.phase_name}`, 20, 195);
  
  // Amount box
  doc.setFillColor(255, 140, 0);
  doc.rect(20, 210, 170, 20, 'F');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(`TOTAL AMOUNT: $${invoiceData.amount.toFixed(2)}`, 25, 225);
  
  // Payment instructions
  doc.setFontSize(14);
  doc.setTextColor(255, 140, 0);
  doc.text('PAYMENT INSTRUCTIONS:', 20, 245);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Bank Name: Citibank', 20, 255);
  doc.text('Bank Address: 111 Wall Street New York, NY 10043 USA', 20, 260);
  doc.text('Routing (ABA): 031100209', 20, 265);
  doc.text('SWIFT Code: CITIUS33', 20, 270);
  doc.text('Account Number: 70586980001243422', 20, 275);
  doc.text('Account Type: CHECKING', 20, 280);
  doc.text('Beneficiary Name: MD RABIULLAH', 20, 285);
  
  doc.setFontSize(12);
  doc.setTextColor(255, 0, 0);
  doc.text(`Reference Number: ${invoiceData.reference_number}`, 20, 295);
  doc.text('(Please include this reference number with your payment)', 20, 300);
  
  // Important notes
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('IMPORTANT NOTES:', 20, 315);
  doc.text('• Only payments from business accounts are supported', 20, 320);
  doc.text('• Personal bank account payments will be declined', 20, 325);
  doc.text('• Please ensure beneficiary name matches exactly', 20, 330);
  
  return doc.output('datauristring');
};
