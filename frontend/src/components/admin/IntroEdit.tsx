import { useEffect, useRef, useState } from "react";
import { useEditIntro, useGetIntro } from "../../hooks/IntroHooks";
import { BACKEND_URL, IEditIntroData } from "../../utils/types";
import { datauri } from "../../utils/datauri";
import { errorMessage } from "../../utils/error";
import { Link } from "react-router-dom";

const IntroEdit = () => {
  const { data } = useGetIntro();
  const { mutateAsync } = useEditIntro();

  const [formData, setFormData] = useState<IEditIntroData>({
    name: null,
    bio: null,
    image: null,
    resume: null,
  });
  const profileImgRef = useRef<HTMLInputElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);

  const [profileImgPreview, setProfileImgPreview] = useState<string | null>(null);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  useEffect(() => {
    if (data && data.intro) {
      setFormData({
        name: data.intro.name,
        bio: data.intro.bio,
        resume: null,
        image: null,
      });
    }
  }, [data]);
  const handleClickUpload = (e: React.MouseEvent<HTMLButtonElement>, ref: React.RefObject<HTMLInputElement>): void => {
    e.preventDefault();
    ref.current?.click();
  };
  const handleChangeUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ): Promise<void> => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const res = await datauri(file);
        setPreview(res);
        setFormData({ ...formData, [e.target.name]: file });
      }
    } catch (error: unknown) {
      console.log(errorMessage(error));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const multiPartForm = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) multiPartForm.append(key, value);
      });
      const res = await mutateAsync(multiPartForm);
      console.log(res);
    } catch (error: unknown) {
      console.log(errorMessage(error));
    }
  };

  return (
    <div className="py-12">
      <form onSubmit={handleSubmit}>
        {/* Upload Image*/}
        <div className="flex flex-col gap-3 pb-4 w-1/5">
          <img
            src={profileImgPreview ? `${profileImgPreview}` : `${BACKEND_URL}/uploads/${data?.intro.image}`}
            className="w-32 h-32 rounded-full object-cover transition-all duration-300 hover:grayscale"
          />

          <input
            type="file"
            ref={profileImgRef}
            name="image"
            hidden
            onChange={(e) => handleChangeUpload(e, setProfileImgPreview)}
          />
          <button
            className="dark:bg-dark-tertiary bg-gray-300 p-1 rounded-sm w-full"
            onClick={(e) => handleClickUpload(e, profileImgRef)}
          >
            Upload Image
          </button>
        </div>
        {/* Full Name and Bio*/}
        <div className="flex flex-col gap-4 py-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name ?? ""}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            className="focus:outline-none w-full px-4 py-3 rounded-md dark:bg-dark-fifth dark:placeholder-dark-tertiary dark:text-dark-tertiary
            bg-[#eeeeee] placeholder-light-tertiary text-light-tertiary placeholder:opacity-35"
          />
          <textarea
            name="bio"
            placeholder="bio"
            value={formData.bio ?? ""}
            onChange={(e) => {
              setFormData({ ...formData, bio: e.target.value });
            }}
            className="focus:outline-none w-full px-4 py-3 rounded-md dark:bg-dark-fifth dark:placeholder-dark-tertiary dark:text-dark-tertiary
            bg-[#eeeeee] placeholder-light-tertiary text-light-tertiary placeholder:opacity-35"
          />
        </div>
        {/* Upload Resume*/}
        <div className="flex flex-col gap-3 pb-4 w-1/5">
          <Link
            target="_blank"
            to={resumePreview ? `${resumePreview}` : `${BACKEND_URL}/uploads/${data?.intro.resume}`}
            className={`${resumePreview ? "text-red-500" : "dark:text-dark-secondary text-light-secondary"}  underline`}
          >
            {data?.intro.resume}
          </Link>
          <button
            className="dark:bg-dark-tertiary bg-gray-300 p-1 rounded-sm w-full"
            onClick={(e) => handleClickUpload(e, resumeRef)}
          >
            Upload Resume
          </button>
          <input
            type="file"
            name="resume"
            hidden
            ref={resumeRef}
            onChange={(e) => handleChangeUpload(e, setResumePreview)}
          />
        </div>
        <button className="bg-blue-400 p-2 mt-5 rounded-sm" type="submit">
          Update Intro
        </button>
      </form>
    </div>
  );
};

export default IntroEdit;
