import { useState } from 'react';
import { useSendEmail } from '../../hooks/EmailHooks';
import { IEmailFormData } from '../../lib/types/formdata';
import { errorMessage } from '../../lib/utils/error';

const Contact = () => {
  const [formData, setFormData] = useState<IEmailFormData>({ name: '', email: '', message: '' });
  const { mutateAsync: sendEmail, isPending } = useSendEmail();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      await sendEmail(formData);
      setFormData({ name: '', email: '', message: '' });
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  return (
    <div>
      <h1>Contact Me</h1>
      <div className="px-4 py-6">
        <form onSubmit={(e) => handleSubmitContact(e)}>
          <input type="text" name="name" value={formData.name} placeholder="Full Name" onChange={handleChange} />
          <input type="email" name="email" value={formData.email} placeholder="Email Address" onChange={handleChange} />
          <textarea name="message" value={formData.message} placeholder="Your Messages" onChange={handleChange} />
          <button type="submit" disabled={isPending}>
            {!isPending ? 'Send Message' : 'Loading...'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
