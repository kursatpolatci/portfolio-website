import { useState } from "react";
import { useSendEmail } from "../../hooks/EmailHooks";
import { IEmailFormData } from "../../lib/types/types";

const Contact = () => {
  const [formData, setFormData] = useState<IEmailFormData>({ name: "", email: "", message: "" });
  const { mutateAsync, isPending } = useSendEmail();

  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await mutateAsync(formData);
      console.log("Response in handleSubmitContact:", res);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error in handleSubmitContact: ", error);
    }
  };
  return (
    <div>
      <h1>Contact Me</h1>
      <div className="px-4 py-6">
        <form onSubmit={(e) => handleSubmitContact(e)}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              placeholder="Your Messages"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
          </div>
          <button>{!isPending ? "Send Message" : "Loading..."}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
