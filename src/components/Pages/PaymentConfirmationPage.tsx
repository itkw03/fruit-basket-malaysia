import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, Phone, MessageSquare, ArrowLeft, CreditCard, Banknote, Clock } from 'lucide-react';
import { Order } from '../types';
import Button from '../UI/Button';

interface PaymentConfirmationPageProps {
  order: Order;
  onBackToHome: () => void;
}

const PaymentConfirmationPage: React.FC<PaymentConfirmationPageProps> = ({ order, onBackToHome }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatOrderItems = () => {
    return order.items.map((item, index) => {
      const productName = `Product ${index + 1}`; // You'd get this from your product data
      return `${productName} x${item.quantity}`;
    }).join(', ');
  };

  const bankDetails = {
    bank: 'Hong Leong Bank',
    accountNumber: '356-00-111-631',
    accountName: 'Fruit Basket Malaysia Enterprise'
  };

  return (
    <div className="min-h-screen bg-neutral-off-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-ash/20">
        <div className="container mx-auto px-4 max-w-4xl py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display text-neutral-charcoal">Payment Instructions</h1>
              <p className="text-neutral-ash">Complete your payment to confirm your order</p>
            </div>
            <Button variant="outline" onClick={onBackToHome} icon={ArrowLeft}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-neutral-ash/20">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <h2 className="text-xl font-display text-neutral-charcoal">Order Confirmed</h2>
                  <p className="text-neutral-ash">Order #{order.orderNumber}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-neutral-charcoal mb-2">Order Items:</h3>
                  <p className="text-sm text-neutral-ash">{formatOrderItems()}</p>
                </div>

                <div>
                  <h3 className="font-medium text-neutral-charcoal mb-2">Delivery Details:</h3>
                  <div className="text-sm text-neutral-ash space-y-1">
                    <p><strong>To:</strong> {order.deliveryAddress.name}</p>
                    <p><strong>Phone:</strong> {order.deliveryAddress.phone}</p>
                    <p><strong>Address:</strong> {order.deliveryAddress.address}</p>
                    <p><strong>Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {order.deliveryTime}</p>
                  </div>
                </div>

                <div className="border-t border-neutral-ash/20 pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-ash">Subtotal:</span>
                    <span>RM{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-ash">Delivery:</span>
                    <span>{order.deliveryFee === 0 ? 'FREE' : `RM${order.deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-primary-orange">
                    <span>Total:</span>
                    <span>RM{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <h3 className="font-medium text-yellow-800">Payment Pending</h3>
              </div>
              <p className="text-sm text-yellow-700">
                Your order is confirmed but payment is pending. Please complete the bank transfer below to proceed with your order.
              </p>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-neutral-ash/20">
              <div className="flex items-center space-x-3 mb-6">
                <Banknote className="w-8 h-8 text-primary-orange" />
                <div>
                  <h2 className="text-xl font-display text-neutral-charcoal">Bank Transfer Details</h2>
                  <p className="text-neutral-ash">Transfer the exact amount to our account</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Bank Details */}
                <div className="bg-neutral-off-white p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-charcoal mb-1">Bank Name</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={bankDetails.bank}
                          readOnly
                          className="flex-1 p-3 bg-white border border-neutral-ash/20 rounded-lg font-medium"
                        />
                        <button
                          onClick={() => copyToClipboard(bankDetails.bank, 'bank')}
                          className="p-3 bg-primary-peach-coral text-white rounded-lg hover:bg-primary-coral transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {copied === 'bank' && (
                        <p className="text-xs text-green-600 mt-1">✓ Copied to clipboard</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-charcoal mb-1">Account Number</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={bankDetails.accountNumber}
                          readOnly
                          className="flex-1 p-3 bg-white border border-neutral-ash/20 rounded-lg font-mono font-medium"
                        />
                        <button
                          onClick={() => copyToClipboard(bankDetails.accountNumber, 'account')}
                          className="p-3 bg-primary-peach-coral text-white rounded-lg hover:bg-primary-coral transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {copied === 'account' && (
                        <p className="text-xs text-green-600 mt-1">✓ Copied to clipboard</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-charcoal mb-1">Account Name</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={bankDetails.accountName}
                          readOnly
                          className="flex-1 p-3 bg-white border border-neutral-ash/20 rounded-lg font-medium"
                        />
                        <button
                          onClick={() => copyToClipboard(bankDetails.accountName, 'name')}
                          className="p-3 bg-primary-peach-coral text-white rounded-lg hover:bg-primary-coral transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {copied === 'name' && (
                        <p className="text-xs text-green-600 mt-1">✓ Copied to clipboard</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-charcoal mb-1">Transfer Amount</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={`RM${order.total.toFixed(2)}`}
                          readOnly
                          className="flex-1 p-3 bg-white border border-neutral-ash/20 rounded-lg font-mono font-bold text-lg text-primary-orange"
                        />
                        <button
                          onClick={() => copyToClipboard(order.total.toFixed(2), 'amount')}
                          className="p-3 bg-primary-peach-coral text-white rounded-lg hover:bg-primary-coral transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {copied === 'amount' && (
                        <p className="text-xs text-green-600 mt-1">✓ Copied to clipboard</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-charcoal mb-1">Reference Number</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={order.orderNumber}
                          readOnly
                          className="flex-1 p-3 bg-white border border-neutral-ash/20 rounded-lg font-mono font-medium"
                        />
                        <button
                          onClick={() => copyToClipboard(order.orderNumber, 'reference')}
                          className="p-3 bg-primary-peach-coral text-white rounded-lg hover:bg-primary-coral transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {copied === 'reference' && (
                        <p className="text-xs text-green-600 mt-1">✓ Copied to clipboard</p>
                      )}
                      <p className="text-xs text-neutral-ash mt-1">
                        ⚠️ Important: Use this reference number in your bank transfer
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Transfer the exact amount: <strong>RM{order.total.toFixed(2)}</strong></li>
                    <li>• Include reference number: <strong>{order.orderNumber}</strong></li>
                    <li>• Keep your payment receipt for verification</li>
                    <li>• Payment verification may take 1-2 business days</li>
                  </ul>
                </div>

                {/* WhatsApp Contact */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-800">After Payment</h4>
                      <p className="text-sm text-green-700">
                        Send your payment receipt to WhatsApp: <strong>+60123925913</strong>
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Include your reference number: {order.orderNumber}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/60123925913?text=Hi, I've made payment for order ${order.orderNumber}. Here's my payment receipt:`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Send WhatsApp Message</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
