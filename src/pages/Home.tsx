import { Github, Linkedin } from 'lucide-react';
import { SiSubstack } from 'react-icons/si';
import myImage from '../../IMG_3108.jpeg';

export default function Home() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="bg-slate-800 rounded-3xl shadow-2xl flex flex-col items-center max-w-3xl w-full mx-4 p-12">
        <div className="flex flex-col items-center max-w-3xl">
          <div className="mb-10">
            <img src={myImage} className="w-64 h-94 rounded-xl mb-3 object-cover" />
          </div>
          <h1 className="text-6xl font-bold text-slate-50 mb-6 text-center">
            Hi, I'm Liam
          </h1>

          <div className="space-y-3 mb-10">
            <p className="text-xl text-slate-300 leading-relaxed text-center max-w-2xl">
              2x SWE Intern @ Meta
            </p>
            <p className="text-xl text-slate-300 leading-relaxed text-center max-w-2xl">
              PittCSC Vice President
            </p>
            <p className="text-xl text-slate-300 leading-relaxed text-center max-w-2xl">
              I love building, learning, and reading.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed text-center max-w-2xl">
              Some of my interests include (but aren't limited to): networking, distributed systems, cloud computing.
            </p>
          </div>

          <div className="flex gap-5">
            <a
              href="https://github.com/liambrem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-slate-100 rounded-lg hover:bg-slate-600 transition-colors duration-200 text-lg"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/liambrem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 text-lg"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
