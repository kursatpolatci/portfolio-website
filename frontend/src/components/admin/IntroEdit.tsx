import { useEffect, useRef, useState } from 'react';
import { useEditIntro, useGetIntro } from '../../hooks/IntroHooks';
import { datauri } from '../../lib/utils/datauri';
import { IIntroFormData } from '../../lib/types/formdata';
import { IntroEditSkeleton } from '../skeletons';
import { errorMessage } from '../../lib/utils/error';
import { ResumeViewer } from '../common/index';

const IntroEdit = () => {
  const { data, isLoading } = useGetIntro();
  const { mutateAsync: editIntro, isPending } = useEditIntro();
  const [showPdf, setShowPdf] = useState(false);
  const profileImgRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const [profileImgPreview, setProfileImgPreview] = useState<string>('');
  const [resumePreview, setResumePreview] = useState<string>('');
  const [formData, setFormData] = useState<IIntroFormData>({
    name: '',
    bio: '',
    image: null,
    resume: null,
  });

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
    setPreview: React.Dispatch<React.SetStateAction<string>>
  ): Promise<void> => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const res = await datauri(file);
        setPreview(res);
        setFormData({ ...formData, [e.target.name]: file });
      }
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const multiPartForm = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value != null) multiPartForm.append(key, value);
      });
      await editIntro(multiPartForm);
    } catch (error: unknown) {
      errorMessage(error);
    }
  };

  if (isLoading) return <IntroEditSkeleton />;
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <img src={profileImgPreview || data?.intro.image} className="intro-avatar" />
        <input
          type="file"
          ref={profileImgRef}
          name="image"
          hidden
          onChange={(e) => handleChangeUpload(e, setProfileImgPreview)}
        />
        <button onClick={(e) => handleClickUpload(e, profileImgRef)}>Upload Image</button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
      </div>
      <div className="flex flex-row gap-4">
        <input
          type="file"
          name="resume"
          hidden
          ref={resumeRef}
          onChange={(e) => handleChangeUpload(e, setResumePreview)}
        />
        <button onClick={(e) => handleClickUpload(e, resumeRef)} className="w-5/6">
          Upload Resume
        </button>
        <p className="link w-1/6 text-center text-nowrap" onClick={() => setShowPdf((prev) => !prev)}>
          View Resume
        </p>
      </div>
      <button type="submit" disabled={isPending} className="update">
        {isPending ? 'Loading...' : 'Update Intro'}
      </button>
      <ResumeViewer setShowPdf={setShowPdf} showPdf={showPdf} resume={resumePreview || data?.intro.resume} />
    </form>
  );
};

export default IntroEdit;
