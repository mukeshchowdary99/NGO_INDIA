import React, { useState } from 'react';
import { 
  Heart, CreditCard, Smartphone, Building, 
  User, Mail, DollarSign, MessageSquare,
  CheckCircle, ArrowLeft, Shield, Award,
  Home, Phone, MapPin
} from 'lucide-react';

export function DonatePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: '',
    paymentMethod: 'card'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Donation amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (Number(formData.amount) < 10) {
      newErrors.amount = 'Minimum donation amount is ₹10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setStep(3);
    } catch (error) {
      setErrors({ payment: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, MasterCard, RuPay'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks supported'
    }
  ];

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
          <div className="text-center">
            <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your generous donation of <span className="font-semibold text-gray-900">₹{formData.amount}</span> has been received successfully.
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Impact</h2>
              <p className="text-gray-700">
                Your contribution will help us continue our mission of empowering communities and creating lasting change across India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-800 font-medium">Receipt sent to your email</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-800 font-medium">Secure transaction</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-purple-800 font-medium">Tax deductible</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 justify-center"
              >
                <Home className="w-5 h-5" />
                Return Home
              </button>
              <button
                onClick={() => window.location.href = '/join'}
                className="border border-orange-500 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Join Our Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-start gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
              {/* Removed text logo, keep only image */}
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-16 text-sm text-gray-600">
              <span className={step >= 1 ? 'text-orange-600 font-medium' : ''}>Details</span>
              <span className={step >= 2 ? 'text-orange-600 font-medium' : ''}>Payment</span>
              <span className={step >= 3 ? 'text-orange-600 font-medium' : ''}>Complete</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          {step === 1 && (
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-orange-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Donation</h1>
                <p className="text-gray-600">Your contribution makes a real difference in communities across India</p>
              </div>

              {/* Impact Stats */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Your Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-2">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">₹500 can provide</p>
                    <p className="font-semibold text-gray-900">School supplies for 5 children</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-2">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">₹1000 can provide</p>
                    <p className="font-semibold text-gray-900">Healthcare for 10 families</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-2">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">₹2500 can provide</p>
                    <p className="font-semibold text-gray-900">Clean water access for 1 month</p>
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                      } focus:ring-2 focus:border-transparent`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                      } focus:ring-2 focus:border-transparent`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Donation Amount *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleInputChange('amount', amount.toString())}
                        className={`py-3 px-4 rounded-lg border-2 transition-colors font-medium ${
                          formData.amount === amount.toString()
                            ? 'border-orange-500 bg-orange-50 text-orange-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.amount ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="Enter custom amount"
                    min="10"
                  />
                  {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Leave a message of support..."
                  />
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Details
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Payment Method</h1>
                <p className="text-gray-600">Secure and trusted payment options</p>
              </div>

              {/* Donation Summary */}
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Donor:</span>
                    <span className="font-medium text-gray-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between text-xl border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-orange-600">₹{formData.amount}</span>
                  </div>
                  {formData.message && (
                    <div className="pt-3 border-t border-gray-200">
                      <span className="text-gray-600">Message:</span>
                      <p className="text-gray-900 mt-1">{formData.message}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => handleInputChange('paymentMethod', method.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                          formData.paymentMethod === method.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${
                            formData.paymentMethod === method.id ? 'bg-orange-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              formData.paymentMethod === method.id ? 'text-orange-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{method.name}</h4>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 p-4 rounded-lg mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Secure Payment</h4>
                    <p className="text-sm text-blue-800">
                      Your payment is secured with 256-bit SSL encryption. We don't store your payment information.
                    </p>
                  </div>
                </div>
              </div>

              {errors.payment && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg mb-6">
                  {errors.payment}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isProcessing ? 'Processing Payment...' : `Donate ₹${formData.amount}`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-8 h-8 rounded-lg" />
              {/* Removed text logo, keep only image */}
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 11 4567 8900
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@ngoindia.org
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                New Delhi, India
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p className="text-gray-400">
              © 2025 NGO INDIA. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}