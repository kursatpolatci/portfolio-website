import { useState } from "react";
import { useSendEmail } from "../hooks/EmailHooks";
import { IEmailData } from "../utils/Definations";

const Contact = () => {
  const [formData, setFormData] = useState<IEmailData>({
    name: "",
    email: "",
    message: "",
  });

  const { mutateAsync, isPending } = useSendEmail();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await mutateAsync(formData);
    console.log(res)
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className="py-6">
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
            name="name"
            value={formData.name}
            placeholder="Full Name"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="focus:outline-none w-full px-4 py-3 rounded-md dark:bg-dark-fifth dark:placeholder-dark-tertiary dark:text-dark-tertiary bg-[#eeeeee] placeholder-light-tertiary text-light-tertiary placeholder:opacity-35"
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
            className="focus:outline-none w-full px-4 py-3 rounded-md dark:bg-dark-fifth dark:placeholder-dark-tertiary dark:text-dark-tertiary bg-[#eeeeee] placeholder-light-tertiary text-light-tertiary placeholder:opacity-35"
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
            className="focus:outline-none w-full px-4 py-3 rounded-md dark:bg-dark-fifth dark:placeholder-dark-tertiary dark:text-dark-tertiary bg-[#eeeeee] placeholder-light-tertiary text-light-tertiary placeholder:opacity-35"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center justify-center dark:bg-dark-secondary dark:text-dark-primary bg-light-quaternary text-light-primary text-nowrap rounded-md h-10 w-fit px-4"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 dark:border-dark-primary border-light-primary rounded-full animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
