import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, X } from 'lucide-react';

const ContactForm = ({ onClose }) => {
  // Note: For direct email sending via EmailJS, see EMAILJS_SETUP.md
  // Currently using mailto link which opens the user's email client

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      // Using mailto link to open user's email client
      // For direct email sending via EmailJS, see EMAILJS_SETUP.md
      // After installing @emailjs/browser, you can add EmailJS integration here
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject || `Contact Form: ${formData.inquiryType}`}
Inquiry Type: ${formData.inquiryType}

Message:
${formData.message}
      `.trim();

      const mailtoLink = `mailto:sajudhamza@gmail.com?subject=${encodeURIComponent(formData.subject || `Contact Form: ${formData.inquiryType}`)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Set success status
      setStatus({
        type: 'success',
        message: 'Opening your email client. Please send the email to complete the submission.'
      });

      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
        setStatus({ type: null, message: '' });
      }, 5000);

    } catch (error) {
      setStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again or email directly at sajudhamza@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-gray-900 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        )}
        
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2">
              <Mail className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Get in Touch
            </h2>
          </div>
          <p className="text-gray-400">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {status.type && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              status.type === 'success'
                ? 'bg-green-900/30 border border-green-500/30'
                : 'bg-red-900/30 border border-red-500/30'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            )}
            <p
              className={`text-sm ${
                status.type === 'success' ? 'text-green-300' : 'text-red-300'
              }`}
            >
              {status.message}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-300 mb-2">
              Inquiry Type *
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              required
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="general">General Inquiry</option>
              <option value="speaking">Speaking Engagement</option>
              <option value="collaboration">Collaboration Opportunity</option>
              <option value="research">Research Discussion</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              placeholder="What's this regarding?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors border border-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            Or email directly at{' '}
            <a
              href="mailto:sajudhamza@gmail.com"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              sajudhamza@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

