import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggleButton } from '../common/index';
import { useLogout } from '../../hooks/AuthHooks';
import { GoHome } from 'react-icons/go';
import { TbLogout2 } from 'react-icons/tb';
import { errorMessage } from '../../lib/utils/error';

const Links = [
  { to: '/admin', name: 'Intro' },
  { to: '/admin-about', name: 'About' },
  { to: '/admin-projects', name: 'Projects' },
];

const NavbarEdit = () => {
  const [activeLink, setActiveLink] = useState<string>('Intro');
  const { mutateAsync: logout } = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLink = Links.find((link) => location.pathname === link.to);
    setActiveLink(currentLink?.name ?? '');
  }, [location]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate('/');
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  return (
    <div className="flex items-center justify-between pt-12">
      <div className="flex gap-4">
        {Links.map((item, id) => {
          return (
            <Link
              to={item.to}
              key={id}
              className={`relative group font-medium ${
                activeLink === item.name
                  ? 'text-light-secondary dark:text-dark-secondary'
                  : 'text-light-fifth dark:text-dark-fifth'
              }`}
              onClick={() => setActiveLink(item.name)}
            >
              {item.name}
              <span
                className={` absolute left-0 bottom-0 w-0 h-[1px] ${
                  activeLink === item.name
                    ? 'bg-light-secondary dark:bg-dark-secondary'
                    : 'bg-light-fifth dark:bg-dark-fifth'
                } transition-all duration-300 group-hover:w-full`}
              />
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4">
        <GoHome onClick={() => navigate('/')} className="toggle" />
        <TbLogout2 onClick={handleLogout} className="toggle" />
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default NavbarEdit;
