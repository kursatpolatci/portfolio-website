import { useState } from "react";
import { useSendEmail } from "../../hooks/EmailHooks";
import { IEmailData } from "../../lib/types/types";

const Contact = () => {
  const [formData, setFormData] = useState<IEmailData>({ name: "", email: "", message: "" });
  const { mutateAsync } = useSendEmail();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await mutateAsync(formData);
      console.log("Response in handleSubmit:", res);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error in handleSubmit: ", error);
    }
  };
  return (
    <div className="max-md:px-6 pt-12">
      <h1 className="pb-6">Contact Me</h1>
      <form className="flex flex-col gap-4 p-4" onSubmit={(e) => handleSubmit(e)}>
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
        <button>Send Email</button>
      </form>
    </div>
  );
};

export default Contact;
