import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-3xl space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-md">
              Bro Chat
            </h1>
            <p className="text-lg sm:text-xl text-base-content/80">
              Connect with friends and strangers across the world. Private,
              secure, and instant. Easy signups — just start chatting.
            </p>
          </div>

          {/* Primary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-xl mx-auto mt-6">
            <Link to="/chat" className="btn btn-sm btn-primary shadow-md">
              Start Chatting
            </Link>
            <Link
              to="/global-chat"
              className="btn btn-sm btn-secondary shadow-md"
            >
              Global Chat
            </Link>
            <Link to="/profile" className="btn btn-sm btn-accent shadow-md">
              Your Profile
            </Link>
            <Link to="/settings" className="btn btn-sm btn-outline shadow-md">
              Settings
            </Link>
          </div>

          {/* Footnote */}
          <div className="pt-8">
            <p className="text-sm text-base-content/60 italic">
              Built with ❤️ using DaisyUI & Tailwind CSS — Your privacy is our
              priority.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
