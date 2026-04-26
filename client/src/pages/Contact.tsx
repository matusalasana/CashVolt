import { Mail, Phone, Send, MessageSquare, Bug, Lightbulb } from "lucide-react";

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">

      {/* HEADER */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Support Center ⚡</h1>

        <p className="text-gray-500 max-w-2xl mx-auto">
          CashVolt is a financial system. Use this page to report issues,
          request features, or get help with your account and transactions.
        </p>
      </div>

      {/* CONTACT OPTIONS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="card bg-base-100 shadow-xl p-6 text-center">
          <Mail className="w-8 h-8 mx-auto text-blue-500 mb-3" />
          <h2 className="text-lg font-semibold">Email Support</h2>
          <p className="text-gray-500 mt-2">matusalasana@gmail.com</p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6 text-center">
          <Phone className="w-8 h-8 mx-auto text-purple-500 mb-3" />
          <h2 className="text-lg font-semibold">Phone Support</h2>
          <p className="text-gray-500 mt-2">+251-945807386</p>
        </div>

        <div className="card bg-base-100 shadow-xl p-6 text-center">
          <MessageSquare className="w-8 h-8 mx-auto text-green-500 mb-3" />
          <h2 className="text-lg font-semibold">Response Time</h2>
          <p className="text-gray-500 mt-2">Usually within 24 hours</p>
        </div>

      </div>

      {/* FORM */}
      <div className="card bg-base-100 shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Submit a Request
        </h2>

        <form className="space-y-4">

          {/* TYPE OF REQUEST */}
          <div className="grid md:grid-cols-3 gap-3">

            <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-base-200">
              <Bug size={18} />
              <span className="text-sm">Report Bug</span>
            </label>

            <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-base-200">
              <Lightbulb size={18} />
              <span className="text-sm">Feature Request</span>
            </label>

            <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-base-200">
              <MessageSquare size={18} />
              <span className="text-sm">General Help</span>
            </label>

          </div>

          {/* INPUTS */}
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
            placeholder="Describe your issue or request..."
            className="textarea textarea-bordered w-full h-32"
          />

          <button className="btn btn-primary w-full flex items-center gap-2">
            <Send className="w-4 h-4" />
            Submit Request
          </button>
        </form>
      </div>

      {/* FOOTER NOTE */}
      <div className="text-center text-gray-500 text-sm">
        CashVolt Support System • Built for financial clarity ⚡
      </div>

    </div>
  );
};

export default Contact;