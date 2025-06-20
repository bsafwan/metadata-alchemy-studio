
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { generateInvoicePDF } from '@/utils/invoiceGenerator';

interface PaymentInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: {
    reference_number: string;
    amount: number;
    phase_name: string;
    project_name: string;
    client_name: string;
    client_email: string;
    due_date: string;
    created_date: string;
  };
}

export default function PaymentInvoiceModal({ isOpen, onClose, paymentData }: PaymentInvoiceModalProps) {
  const handleDownloadPDF = () => {
    const pdfData = generateInvoicePDF(paymentData);
    const link = document.createElement('a');
    link.href = pdfData;
    link.download = `Invoice_${paymentData.reference_number}.pdf`;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payment Invoice</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-elismet-orange/10 p-4 rounded-lg">
            <h3 className="font-semibold text-elismet-orange mb-2">Invoice Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Reference:</strong> {paymentData.reference_number}</p>
                <p><strong>Amount:</strong> ${paymentData.amount.toFixed(2)}</p>
                <p><strong>Phase:</strong> {paymentData.phase_name}</p>
              </div>
              <div>
                <p><strong>Project:</strong> {paymentData.project_name}</p>
                <p><strong>Due Date:</strong> {paymentData.due_date}</p>
                <p><strong>Invoice Date:</strong> {paymentData.created_date}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">Payment Instructions</h3>
            <div className="text-sm space-y-1">
              <p><strong>Bank:</strong> Citibank</p>
              <p><strong>Routing (ABA):</strong> 031100209</p>
              <p><strong>Account:</strong> 70586980001243422</p>
              <p><strong>Beneficiary:</strong> MD RABIULLAH</p>
              <p><strong>Reference:</strong> <span className="font-mono bg-yellow-100 px-1">{paymentData.reference_number}</span></p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownloadPDF} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice PDF
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
