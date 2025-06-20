
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
  
  // Header Background
  doc.setFillColor(255, 140, 0);
  doc.rect(0, 0, 210, 45, 'F');
  
  // Add ELISMET Logo (using the uploaded logo)
  try {
    // For now, we'll use a text-based logo representation until we can load the actual image
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text('ELISMET', 20, 28);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Building Digital Excellence', 20, 38);
  } catch (error) {
    console.log('Logo loading fallback used');
  }
  
  // Invoice Title
  doc.setFillColor(255, 255, 255);
  doc.rect(140, 8, 55, 30, 'F');
  doc.setFontSize(24);
  doc.setTextColor(255, 140, 0);
  doc.setFont(undefined, 'bold');
  doc.text('INVOICE', 145, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'normal');
  doc.text(`#${invoiceData.reference_number}`, 145, 28);
  doc.text(`Date: ${invoiceData.created_date}`, 145, 34);
  
  // Company Details Section
  doc.setFillColor(245, 245, 245);
  doc.rect(15, 50, 180, 25, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(15, 50, 180, 25);
  
  doc.setFontSize(12);
  doc.setTextColor(255, 140, 0);
  doc.setFont(undefined, 'bold');
  doc.text('ELISMET LTD - COMPANY DETAILS', 20, 58);
  
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'normal');
  doc.text('Company Number: 16433590', 20, 64);
  doc.text('Office 12611, 182-184 High Street North, East Ham, London, E6 2JA, UK', 20, 68);
  doc.text('Email: contact@elismet.com | Phone: +44 7380480139', 20, 72);
  
  // Bill To Section
  doc.setFillColor(240, 248, 255);
  doc.rect(15, 80, 180, 35, 'F');
  doc.setDrawColor(30, 144, 255);
  doc.rect(15, 80, 180, 35);
  
  doc.setFontSize(12);
  doc.setTextColor(30, 144, 255);
  doc.setFont(undefined, 'bold');
  doc.text('BILL TO', 20, 88);
  
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'bold');
  doc.text(invoiceData.client_name, 20, 96);
  doc.setFont(undefined, 'normal');
  doc.text(`${invoiceData.client_business} (${invoiceData.client_industry})`, 20, 102);
  doc.text(invoiceData.client_email, 20, 108);
  
  // Service Details Table
  doc.setFillColor(255, 140, 0);
  doc.rect(15, 120, 180, 12, 'F');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.text('DESCRIPTION', 20, 128);
  doc.text('AMOUNT', 160, 128);
  
  // Service Row
  doc.setFillColor(255, 255, 255);
  doc.rect(15, 132, 180, 20, 'F');
  doc.setDrawColor(51, 51, 51);
  doc.rect(15, 132, 180, 20);
  
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'bold');
  doc.text(`Project: ${invoiceData.project_name}`, 20, 140);
  doc.setFont(undefined, 'normal');
  doc.text('50% Milestone Payment (Half of Total Project Value)', 20, 146);
  
  doc.setFont(undefined, 'bold');
  doc.setFontSize(14);
  doc.text(`$${invoiceData.amount.toFixed(2)}`, 160, 143);
  
  // Total Section
  doc.setFillColor(255, 140, 0);
  doc.rect(120, 157, 75, 25, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL AMOUNT DUE', 125, 166);
  doc.setFontSize(18);
  doc.text(`$${invoiceData.amount.toFixed(2)}`, 125, 176);
  
  // Payment Instructions Header
  doc.setFillColor(220, 53, 69);
  doc.rect(15, 187, 180, 12, 'F');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.text('⚠️ MANDATORY PAYMENT INSTRUCTIONS', 20, 195);
  
  // Payment Instructions Table
  doc.setFillColor(248, 249, 250);
  doc.rect(15, 199, 180, 70, 'F');
  doc.setDrawColor(220, 53, 69);
  doc.setLineWidth(2);
  doc.rect(15, 199, 180, 70);
  
  // Table headers
  doc.setFillColor(255, 243, 205);
  doc.rect(15, 199, 90, 10, 'F');
  doc.rect(105, 199, 90, 10, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'bold');
  doc.text('PAYMENT DETAILS', 20, 206);
  doc.text('BANK INFORMATION', 110, 206);
  
  // Table content - Left column
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  doc.text('Payment Method:', 20, 216);
  doc.setFont(undefined, 'bold');
  doc.text('ACH or FDWIRE ONLY', 20, 221);
  
  doc.setFont(undefined, 'normal');
  doc.text('Account Type:', 20, 228);
  doc.setFont(undefined, 'bold');
  doc.text('BUSINESS ACCOUNT ONLY', 20, 233);
  
  doc.setFont(undefined, 'normal');
  doc.text('Reference (MANDATORY):', 20, 240);
  doc.setFillColor(255, 255, 0);
  doc.rect(19, 242, 85, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 0, 0);
  doc.text(invoiceData.reference_number, 22, 247);
  
  doc.setTextColor(51, 51, 51);
  doc.setFont(undefined, 'normal');
  doc.text('Due Date:', 20, 257);
  doc.setFont(undefined, 'bold');
  doc.text(invoiceData.due_date, 20, 262);
  
  // Table content - Right column
  doc.setFont(undefined, 'normal');
  doc.text('Bank Name:', 110, 216);
  doc.setFont(undefined, 'bold');
  doc.text('Citibank', 110, 221);
  
  doc.setFont(undefined, 'normal');
  doc.text('Routing (ABA):', 110, 228);
  doc.setFont(undefined, 'bold');
  doc.text('031100209', 110, 233);
  
  doc.setFont(undefined, 'normal');
  doc.text('Account Number:', 110, 240);
  doc.setFont(undefined, 'bold');
  doc.text('70586980001243422', 110, 245);
  
  doc.setFont(undefined, 'normal');
  doc.text('Beneficiary Name:', 110, 252);
  doc.setFont(undefined, 'bold');
  doc.text('MD RABIULLAH', 110, 257);
  
  doc.setFont(undefined, 'normal');
  doc.text('SWIFT Code:', 110, 264);
  doc.setFont(undefined, 'bold');
  doc.text('CITIUS33', 110, 269);
  
  // Important Notice Box
  doc.setFillColor(220, 53, 69);
  doc.rect(15, 274, 180, 25, 'F');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.text('🚨 CRITICAL REQUIREMENTS:', 20, 282);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('• Payment MUST be made from your registered business account', 20, 288);
  doc.text('• Use ONLY ACH or FDWIRE transfer methods', 20, 292);
  doc.text(`• ALWAYS include reference: ${invoiceData.reference_number}`, 20, 296);
  
  return doc.output('datauristring');
};
