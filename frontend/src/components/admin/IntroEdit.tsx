import { useEffect, useRef, useState } from "react";
import { useEditIntro, useGetIntro } from "../../hooks/IntroHooks";
import { BACKEND_URL } from "../../lib/types/types";
import { datauri } from "../../lib/utils/datauri";
import { errorMessage } from "../../lib/utils/error";
import { Link } from "react-router-dom";

const IntroEdit = () => {
  const { data } = useGetIntro();
  const { mutateAsync: editIntro } = useEditIntro();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: null as File | null,
    resume: null as File | null,
  });

  const profileImgRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

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
      console.log(formData);
      Object.entries(formData).forEach(([key, value]) => {
        if (value) multiPartForm.append(key, value);
      });
      const res = await editIntro(multiPartForm);
      console.log(`Result of editIntro: `, res);
    } catch (error: unknown) {
      console.log(errorMessage(error));
    }
  };
  return (
    <div className="max-md:px-6">
      <form onSubmit={handleSubmit}>
        {/* Upload Image*/}
        <div className="flex flex-col gap-4">
          <img
            src={profileImgPreview ? `${profileImgPreview}` : `${BACKEND_URL}/uploads/${data?.intro.image}`}
            className="avatar"
          />
          <input
            type="file"
            ref={profileImgRef}
            name="image"
            hidden
            onChange={(e) => handleChangeUpload(e, setProfileImgPreview)}
          />
          <button onClick={(e) => handleClickUpload(e, profileImgRef)}>Upload Image</button>
        </div>
        {/* Name and Bio*/}
        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name || ""}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio || ""}
            onChange={(e) => {
              setFormData({ ...formData, bio: e.target.value });
            }}
          />
        </div>
        {/* Upload Resume*/}
        <div className="flex flex-row gap-4">
          <input
            type="file"
            name="resume"
            hidden
            ref={resumeRef}
            onChange={(e) => handleChangeUpload(e, setResumePreview)}
          />
          <button onClick={(e) => handleClickUpload(e, resumeRef)}>Upload Resume</button>
          <Link
            target="_blank"
            to={resumePreview ? `${resumePreview}` : `${BACKEND_URL}/uploads/${data?.intro.resume}`}
          >
            <span className="link">{data?.intro.resume}</span>
          </Link>
        </div>
        {/* Submit Button */}
        <button className="update">Update Intro</button>
      </form>
    </div>
  );
};

export default IntroEdit;
