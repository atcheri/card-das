import { FC } from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { TbBrandTailwind } from 'react-icons/tb';
import { VscGithub } from 'react-icons/vsc';

const Footer: FC = () => {
  return (
    <footer className="text-center text-white bg-siteFooter">
      <div className="flex justify-center gap-2 p-4 text-2xl">
        <a href="https://github.com/atcheri/card-das" target="_blank">
          <BsLinkedin className="inline-block" />
        </a>
        <a href="https://www.linkedin.com/in/endoatsuhiro/" target="_blank">
          <VscGithub className="inline-block" />
        </a>
      </div>
      Style powered by{' '}
      <a href="https://tailwind-elements.com/" target="_blank" className="text-blue-500">
        Tailwind css <TbBrandTailwind className="inline-block text-blue-400" />
      </a>
      <div className="p-4">© {new Date().getFullYear()} No Copyright:</div>
    </footer>
  );
};

export default Footer;
