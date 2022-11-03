import { FC } from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { TbBrandTailwind } from 'react-icons/tb';
import { VscGithub } from 'react-icons/vsc';
import { SiVite } from 'react-icons/si';
import { AvalancheIcon } from './icons';

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
      <div>
        Built with{' '}
        <a href="https://vitejs.dev/" className="text-blue-500">
          Vite <SiVite className="inline-block text-violet-500" />
        </a>
      </div>
      <div>
        Using the{' '}
        <a href="https://www.avax.network/" target="_blank" className="text-blue-500">
          Avax Network{' '}
          <span className="inline-block">
            <AvalancheIcon width={20} height={20} />
          </span>
        </a>
      </div>
      <div>
        Styled with{' '}
        <a href="https://tailwind-elements.com/" target="_blank" className="text-blue-500">
          Tailwind css <TbBrandTailwind className="inline-block text-blue-400" />
        </a>
      </div>
      <div className="p-4">© {new Date().getFullYear()} No Copyright</div>
    </footer>
  );
};

export default Footer;
