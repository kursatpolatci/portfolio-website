import { useGetIntro } from '../../hooks/IntroHooks';
import { useState } from 'react';
import { FaGithub, FaHackerrank, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IntroSkeleton } from '../skeletons';
import { ResumeViewer } from './index';

const Icons = [
  { Icon: FaGithub, to: 'https://github.com/kursatpolatci' },
  { Icon: FaHackerrank, to: 'https://www.hackerrank.com/profile/kursatpolatci' },
  { Icon: FaInstagram, to: 'https://www.instagram.com/kursatpolatci/' },
  { Icon: FaLinkedin, to: 'https://www.linkedin.com/in/kursatpolatci/' },
];

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
  const intro = data?.intro;
  const [showPdf, setShowPdf] = useState(false);

  if (isLoading) return <IntroSkeleton />;
  return (
    <div>
      <img src={intro?.image} className="intro-avatar" />
      <div className="flex flex-col gap-5 pt-5">
        <h1>{intro?.name}</h1>
        <p>{intro?.bio}</p>
        <SocialIcons />
        <span className="link" onClick={() => setShowPdf((prev) => !prev)}>
          View Resume
        </span>
      </div>
      <ResumeViewer setShowPdf={setShowPdf} showPdf={showPdf} resume={intro?.resume} />
    </div>
  );
};

export default Intro;
