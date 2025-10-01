import { Github, Linkedin } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center max-w-3xl">
        <div className="mb-10">
          <div className="w-64 h-64 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-slate-500 text-lg shadow-xl">
            Your Photo
          </div>
        </div>

        <h1 className="text-6xl font-bold text-slate-900 mb-6 text-center">
          Hi, I'm Liam
        </h1>

        <p className="text-xl text-slate-600 leading-relaxed mb-10 text-center max-w-2xl">
          Add your description here. Tell people what you do, what you're passionate about,
          or what makes you unique.
        </p>

        <div className="flex gap-5">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 text-lg"
          >
            <Github size={24} />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
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
  );
}

export default App;
