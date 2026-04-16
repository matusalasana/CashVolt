import { Mail, MessageSquare, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">

      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Contact CashVolt ⚡</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Got a question, feedback, or issue? We’re here to help you manage your money better.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="card bg-base-100 shadow-xl p-6 text-center">
          <Mail className="w-8 h-8 mx-auto text-blue-500 mb-3" />
          <h2 className="text-lg font-semibold">Email Support</h2>
          <p className="text-gray-500 mt-2">support@cashvolt.app</p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6 text-center">
          <MessageSquare className="w-8 h-8 mx-auto text-green-500 mb-3" />
          <h2 className="text-lg font-semibold">Live Chat</h2>
          <p className="text-gray-500 mt-2">Fast responses for urgent issues</p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6 text-center">
          <Phone className="w-8 h-8 mx-auto text-purple-500 mb-3" />
          <h2 className="text-lg font-semibold">Phone Support</h2>
          <p className="text-gray-500 mt-2">Available for premium users</p>
        </div>

      </div>

      {/* Contact Form */}
      <div className="card bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Send us a message</h2>

        <form className="space-y-4">

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            className="input input-bordered w-full"
          />

          <textarea
            placeholder="Your Message..."
            className="textarea textarea-bordered w-full h-32"
          />

          <button className="btn btn-primary w-full flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-500 text-sm">
        We usually respond within 24 hours ⚡
      </div>

    </div>
  );
};

export default Contact;