import { MdClose } from 'react-icons/md';

interface IShowPdfProps {
  setShowPdf: React.Dispatch<React.SetStateAction<boolean>>;
  showPdf: boolean;
  resume: string | undefined;
}

const ResumeViewer: React.FC<IShowPdfProps> = ({ setShowPdf, showPdf, resume }) => {
  return (
    <>
      {showPdf && resume && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-70">
          <MdClose
            className="absolute z-20 top-5 right-5 dark:text-white text-gray-300 size-8 max-md:size-7 cursor-pointer"
            onClick={() => setShowPdf(false)}
          />
          <iframe src={resume} className="w-4/5 h-4/5" title="Resume" />
        </div>
      )}
    </>
  );
};

export default ResumeViewer;
