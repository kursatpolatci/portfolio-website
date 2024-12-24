import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { ThemeToggleButton } from './index';
import { Links } from '../../lib/constants/data';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string>('Home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLink = Links.find((link) => location.pathname === link.to);
    setActiveLink(currentLink?.name ?? '');
  }, [location]);

  return (
    <div className="flex items-center justify-between pt-12">
      <div className="flex gap-4">
        {Links?.map((item) => {
          return (
            <Link
              to={item.to}
              key={item.name}
              className={`relative group ${
                activeLink === item.name
                  ? 'text-light-secondary dark:text-dark-secondary'
                  : 'text-light-fifth dark:text-dark-fifth'
              }`}
            >
              {item.name}
              <span
                className={`absolute left-0 bottom-0 w-0 h-[1px] ${
                  activeLink === item.name
                    ? 'bg-light-secondary dark:bg-dark-secondary'
                    : 'bg-light-fifth dark:bg-dark-fifth'
                } transition-all group-hover:w-full`}
              />
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4">
        <MdDashboard onClick={() => navigate('/admin')} className="toggle" />
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default Navbar;
