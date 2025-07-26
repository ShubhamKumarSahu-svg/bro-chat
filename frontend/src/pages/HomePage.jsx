import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center px-6 py-16 transition-colors">
        {/* Logo and tagline */}
        <div className="max-w-lg w-full mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-base-content leading-tight mb-6 select-none">
            Bro<span className="text-primary">Chat</span>
          </h1>
          <p className="text-base sm:text-lg text-base-content/70 font-medium mb-10">
            Simple. Secure. Seamless. Connect privately or with the world,
            elegantly.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full mb-10">
          <Link to="/chat" className="group focus:outline-none">
            <div className="bg-base-200 border border-base-300 rounded-xl shadow hover:shadow-lg transition-all py-7 px-7 flex flex-col items-center text-center hover:border-primary focus-visible:ring-2 focus-visible:ring-primary">
              <span className="text-2xl font-bold text-primary mb-2">
                Start Chat
              </span>
              <span className="text-sm text-base-content/60">
                Direct & private messaging
              </span>
            </div>
          </Link>
          <Link to="/global-chat" className="group focus:outline-none">
            <div className="bg-base-200 border border-base-300 rounded-xl shadow hover:shadow-lg transition-all py-7 px-7 flex flex-col items-center text-center hover:border-primary focus-visible:ring-2 focus-visible:ring-primary">
              <span className="text-2xl font-bold text-primary mb-2">
                Global Chat
              </span>
              <span className="text-sm text-base-content/60">
                Public lounge, live conversations
              </span>
            </div>
          </Link>
          <Link to="/profile" className="group focus:outline-none">
            <div className="bg-base-200 border border-base-300 rounded-xl shadow hover:shadow-lg transition-all py-7 px-7 flex flex-col items-center text-center hover:border-primary focus-visible:ring-2 focus-visible:ring-primary">
              <span className="text-2xl font-bold text-primary mb-2">
                Your Profile
              </span>
              <span className="text-sm text-base-content/60">
                Personal info and customization
              </span>
            </div>
          </Link>
          <Link to="/settings" className="group focus:outline-none">
            <div className="bg-base-200 border border-base-300 rounded-xl shadow hover:shadow-lg transition-all py-7 px-7 flex flex-col items-center text-center hover:border-primary focus-visible:ring-2 focus-visible:ring-primary">
              <span className="text-2xl font-bold text-primary mb-2">
                Settings
              </span>
              <span className="text-sm text-base-content/60">
                Privacy, notification, themes
              </span>
            </div>
          </Link>
        </div>

        <div className="max-w-lg mx-auto">
          <p className="text-xs text-base-content/50 text-center">
            Crafted with precision, <span className="text-error">♥</span>, and
            modern UX patterns.
            <br />
            Clean design, frictionless experience—no distractions, just
            conversation.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
