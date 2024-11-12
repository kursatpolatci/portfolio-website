import { useState } from "react";

interface IFormData {
  fullName: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<IFormData>({
    fullName: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="py-12">
      <h1 className="text-2xl text-light-secondary dark:text-dark-secondary mb-6">
        Contact Me
      </h1>
      <form
        className="flex flex-col gap-4 p-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            placeholder="Full Name"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="focus:outline-none w-full px-4 py-3 rounded-md dark:bg-dark-fifth dark:placeholder-dark-tertiary dark:text-dark-tertiary bg-[#eeeeee] placeholder-light-tertiary text-light-tertiary"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="focus:outline-none w-full px-4 py-3 rounded-md dark:bg-dark-fifth dark:placeholder-dark-tertiary dark:text-dark-tertiary bg-[#eeeeee] placeholder-light-tertiary text-light-tertiary"
          />
        </div>
        <div>
          <textarea
            name="message"
            value={formData.message}
            placeholder="Your Messages"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="focus:outline-none w-full px-4 py-3 rounded-md dark:bg-dark-fifth dark:placeholder-dark-tertiary dark:text-dark-tertiary bg-[#eeeeee] placeholder-light-tertiary text-light-tertiary"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center dark:bg-dark-secondary dark:text-dark-primary bg-light-quaternary text-light-primary text-nowrap rounded-md h-10 w-fit px-4"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
