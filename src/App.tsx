import { Github, Linkedin } from 'lucide-react';
import myImage from '../IMG_3108.jpeg';


function App() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center max-w-3xl w-full p-12">
          <div className="flex flex-col items-center max-w-3xl">
      <div className="mb-10">
        <img src={myImage} className="w-64 h-94 rounded-xl mb-3 object-cover" />
            </div>
            <h1 className="text-6xl font-bold text-slate-900 mb-6 text-center">
              Hi, I'm Liam
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 text-center max-w-2xl">
              SWE Intern @ Meta - PittCSC Events Coordinator - working with low-level systems
            </p>

            <div className="flex gap-5">
              <a
                href="https://github.com/liambrem"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 text-lg"
              >
                <Github size={24} />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/liambrem"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
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

export default App;
