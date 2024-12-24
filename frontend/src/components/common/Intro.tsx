import { useGetIntro } from '../../hooks/IntroHooks';
import { useState } from 'react';
import { IntroSkeleton } from '../skeletons';
import { ResumeViewer } from './index';
import { Icons } from '../../lib/constants/data';

const SocialIcons = () => {
  return (
    <div className="flex gap-4">
      {Icons?.map((item, id) => {
        return (
          <a href={item.to} key={id} target="_blank" rel="noreferrer noopener">
            <item.Icon className="intro-icon" />
          </a>
        );
      })}
    </div>
  );
};

const Intro = () => {
  const { data, isLoading } = useGetIntro();
  const [showPdf, setShowPdf] = useState(false);

  if (isLoading) return <IntroSkeleton />;
  return (
    <div>
      <img src={data?.intro?.image} className="intro-avatar" alt="avatar" />
      <div className="flex flex-col gap-3 pt-6">
        <h1>{data?.intro?.name}</h1>
        <p>{data?.intro?.bio}</p>
        <SocialIcons />
        <span className="link" onClick={() => setShowPdf((prev) => !prev)}>
          View Resume
        </span>
        <ResumeViewer setShowPdf={setShowPdf} showPdf={showPdf} resume={data?.intro?.resume} />
      </div>
    </div>
  );
};

export default Intro;
