import { Camera, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    isDeletingAccount,
    deleteAccount,
  } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImg(URL.createObjectURL(file));
    await updateProfile(file);
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center pt-24 px-2">
      <div className="w-full max-w-2xl space-y-8">
        {/* Profile Card */}
        <section className="bg-base-200/90 rounded-2xl shadow-xl p-8 pb-6 border border-base-300">
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar */}
            <div className="relative group mb-1">
              <img
                src={
                  selectedImg ||
                  authUser.profilePic?.secure_url ||
                  '/avatar.png'
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-base-300 shadow-lg transition"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2 bg-primary text-primary-content
                  p-2 rounded-full shadow cursor-pointer opacity-80 hover:opacity-100
                  ring-2 ring-base-100 ring-offset-2 ring-offset-base-200 transition-all
                  ${
                    isUpdatingProfile
                      ? 'pointer-events-none animate-pulse opacity-40'
                      : ''
                  }
                `}
                title="Change Profile Picture"
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="text-sm text-base-content/50 mt-1">
              {isUpdatingProfile ? (
                <span className="animate-pulse">Updating photo…</span>
              ) : (
                'Click camera to update your photo'
              )}
            </div>
          </div>

          {/* Info Fields */}
          <div className="mt-7 grid grid-cols-1 gap-5 sm:gap-7">
            <div>
              <label className="flex items-center gap-2 text-sm text-base-content/60 mb-1 font-medium">
                <User className="w-4 h-4" /> Full Name
              </label>
              <div className="rounded-lg bg-base-100 border border-base-300 px-4 py-2.5 text-base-content font-semibold select-text">
                {authUser?.fullName}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-base-content/60 mb-1 font-medium">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <div className="rounded-lg bg-base-100 border border-base-300 px-4 py-2.5 text-base-content select-text">
                {authUser?.email}
              </div>
            </div>
          </div>
        </section>

        {/* Account Meta Card */}
        <section className="bg-base-200/90 rounded-2xl shadow-md p-6 border border-base-300">
          <h2 className="text-lg font-semibold mb-3 text-base-content">
            Account Information
          </h2>
          <div className="space-y-2 text-base text-base-content/80">
            <div className="flex items-center justify-between border-b border-base-300 pb-2">
              <span>Member Since</span>
              <span className="font-semibold">
                {authUser.createdAt?.split('T')[0]}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span>Account Status</span>
              <span className="text-success font-semibold">Active</span>
            </div>
          </div>
        </section>

        {/* Danger Zone Card */}
        <section className="bg-base-300 rounded-2xl shadow-lg p-6 border border-error/20">
          <h2 className="text-lg font-semibold mb-2 text-error">Danger Zone</h2>
          <p className="text-sm text-error/70 mb-4">
            <strong>Warning:</strong> Deleting your account is permanent and
            cannot be undone.
          </p>
          <button
            className="btn btn-error btn-block font-semibold"
            onClick={handleDeleteAccount}
            disabled={isDeletingAccount}
          >
            {isDeletingAccount ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Deleting Account…
              </>
            ) : (
              'Delete Account'
            )}
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
