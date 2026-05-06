import { Github, Linkedin, Mail } from 'lucide-react';
import myImage from '../../IMG_3108.jpeg';
import ConstellationBackground from '../components/ConstellationBackground';

export default function Home() {
  return (
    <div className="pt-[65px] relative">
      <ConstellationBackground />
      <div className="relative" style={{ zIndex: 1 }}>

      {/* Hero */}
      <section className="min-h-screen flex items-center px-8">
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-none mb-6">
              Liam<br />Brem
            </h1>
            <p
              className="text-xs text-gray-500 tracking-widest uppercase mb-6"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Software Engineer — Student
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-3">
              2x SWE Intern @ Meta. PittCSC President.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              I love building, learning, and reading.
            </p>
          </div>

          {/* Right */}
          <div className="flex justify-center md:justify-end">
            <img
              src={myImage}
              alt="Liam Brem"
              className="w-64 h-80 lg:w-80 lg:h-96 object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs text-gray-500 tracking-widest uppercase mb-10"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            About
          </p>
          <div className="max-w-2xl space-y-5">
            <p className="text-gray-200 text-xl leading-relaxed">
              I'm a computer science student with a passion for building systems and understanding how tech works at scale.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I starting programming in middle school, which allowed me to find my passion for tech. Since then, I've interned twice at Meta, working on large-scale infrastructure. Outside of engineering, I serve as the President of PittCSC - the largest student organization at the University of Pittsburgh.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My technical interests include distributed systems, networking, and cloud computing.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Outside of school/work, I love playing soccer and going to the gym. You can also find me playing the guitar or going on cool hikes. 
            </p>
            <p className="text-gray-400 leading-relaxed">
              To see what I've been working on recently, feel free to check out my github or read my blog!
            </p>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="py-24 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs text-gray-500 tracking-widest uppercase mb-10"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Connect
          </p>
          <div className="flex flex-col gap-5">
            <a
              href="https://github.com/liambrem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors w-fit group"
            >
              <Github size={18} />
              <span className="text-sm tracking-wide group-hover:text-white">github.com/liambrem</span>
            </a>
            <a
              href="https://linkedin.com/in/liambrem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors w-fit group"
            >
              <Linkedin size={18} />
              <span className="text-sm tracking-wide group-hover:text-white">linkedin.com/in/liambrem</span>
            </a>
            <a
              href="mailto:liambrem05@gmail.com"
              className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors w-fit group"
            >
              <Mail size={18} />
              <span className="text-sm tracking-wide group-hover:text-white">liambrem05@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
