import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvoiceRequest {
  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  service: {
    name: string;
    details?: string;
    quantity: number;
    price: number;
    currency: string;
  };
  paymentTerms: string;
  dueDate: string;
  paymentMethods: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('Stripe API key not configured');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const invoiceData: InvoiceRequest = await req.json();

    console.log('Creating Stripe invoice for:', invoiceData.customer.email);
    console.log('Service details:', {
      name: invoiceData.service.name,
      price: invoiceData.service.price,
      quantity: invoiceData.service.quantity,
      currency: invoiceData.service.currency
    });

    // Create or get customer
    const customers = await stripe.customers.list({
      email: invoiceData.customer.email,
      limit: 1,
    });

    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        name: invoiceData.customer.name,
        email: invoiceData.customer.email,
        phone: invoiceData.customer.phone,
        address: invoiceData.customer.address ? {
          line1: invoiceData.customer.address,
        } : undefined,
      });
    }

    // Calculate amount in smallest currency unit (cents for USD, pence for GBP, etc.)
    const unitAmount = Math.round(invoiceData.service.price * 100);
    const totalAmount = unitAmount * invoiceData.service.quantity;

    console.log('Calculated amounts:', {
      unitAmount,
      totalAmount,
      originalPrice: invoiceData.service.price,
      quantity: invoiceData.service.quantity
    });

    // Create invoice item using price_data so the invoice shows product + unit price clearly
    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      price_data: {
        currency: invoiceData.service.currency.toLowerCase(),
        unit_amount: unitAmount,
        product_data: {
          name: invoiceData.service.name,
          description: invoiceData.service.details || undefined,
        },
      },
      quantity: invoiceData.service.quantity,
      metadata: {
        service_name: invoiceData.service.name,
        service_details: invoiceData.service.details || '',
        unit_price: invoiceData.service.price.toString(),
        quantity: invoiceData.service.quantity.toString(),
      },
    });

    console.log('Invoice item created:', invoiceItem.id);

    // Create invoice
    const dueTimestamp = Math.floor(new Date(invoiceData.dueDate).getTime() / 1000);
    
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: Math.max(1, Math.ceil((dueTimestamp - Date.now() / 1000) / 86400)),
      auto_advance: false,
      description: `${invoiceData.service.name} - ${invoiceData.paymentTerms}`,
      footer: `Payment Terms: ${invoiceData.paymentTerms}\nPayment Methods: ${invoiceData.paymentMethods}\n\nElismet Ltd\nUK Registration Number: 16433590\nOffice 12611 182-184 High Street North, East Ham, London, United Kingdom, E6 2JA`,
      metadata: {
        payment_terms: invoiceData.paymentTerms,
        payment_methods: invoiceData.paymentMethods,
        service_name: invoiceData.service.name,
      },
    });

    // Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // Send the invoice
    await stripe.invoices.sendInvoice(finalizedInvoice.id);

    console.log('Invoice created successfully:', finalizedInvoice.number);

    // Send email notification
    try {
      const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/zoho-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        },
        body: JSON.stringify({
          to: ['bsafwanjamil677@gmail.com'],
          subject: `New Invoice Generated: ${finalizedInvoice.number}`,
          html: `
            <h2>New Stripe Invoice Generated</h2>
            <p>A new invoice has been created in Stripe:</p>
            
            <h3>Invoice Details</h3>
            <ul>
              <li><strong>Invoice Number:</strong> ${finalizedInvoice.number}</li>
              <li><strong>Amount:</strong> ${(totalAmount / 100).toFixed(2)} ${invoiceData.service.currency.toUpperCase()}</li>
              <li><strong>Due Date:</strong> ${invoiceData.dueDate}</li>
              <li><strong>Payment Terms:</strong> ${invoiceData.paymentTerms}</li>
            </ul>
            
            <h3>Customer Information</h3>
            <ul>
              <li><strong>Name:</strong> ${invoiceData.customer.name}</li>
              <li><strong>Email:</strong> ${invoiceData.customer.email}</li>
              ${invoiceData.customer.phone ? `<li><strong>Phone:</strong> ${invoiceData.customer.phone}</li>` : ''}
              ${invoiceData.customer.address ? `<li><strong>Address:</strong> ${invoiceData.customer.address}</li>` : ''}
            </ul>
            
            <h3>Service Information</h3>
            <ul>
              <li><strong>Service:</strong> ${invoiceData.service.name}</li>
              ${invoiceData.service.details ? `<li><strong>Details:</strong> ${invoiceData.service.details}</li>` : ''}
              <li><strong>Quantity:</strong> ${invoiceData.service.quantity}</li>
              <li><strong>Unit Price:</strong> ${invoiceData.service.price} ${invoiceData.service.currency.toUpperCase()}</li>
            </ul>
            
            <p><a href="${finalizedInvoice.hosted_invoice_url}" style="display: inline-block; padding: 10px 20px; background-color: #635BFF; color: white; text-decoration: none; border-radius: 5px;">View Invoice in Stripe</a></p>
            
            <hr style="margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">
              <strong>Elismet Ltd</strong><br>
              UK Registration Number: 16433590<br>
              Office 12611 182-184 High Street North, East Ham, London, United Kingdom, E6 2JA
            </p>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Failed to send notification email:', await emailResponse.text());
      } else {
        console.log('Notification email sent successfully');
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the whole request if email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        invoiceId: finalizedInvoice.id,
        invoiceNumber: finalizedInvoice.number,
        invoiceUrl: finalizedInvoice.hosted_invoice_url,
        amount: totalAmount / 100,
        currency: invoiceData.service.currency.toUpperCase(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
