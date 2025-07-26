const Avatar = ({ src, alt, size = 'size-10', ring = true }) => {
  // Normalize profilePic (string, object, or empty)
  const profilePic =
    typeof src === 'string' && src.trim() !== ''
      ? src
      : src?.secure_url || src?.url || '/avatar.png';

  return (
    <div className="avatar">
      <div
        className={`${size} rounded-full ${
          ring ? 'ring ring-primary ring-offset-base-100 ring-offset-2' : ''
        }`}
      >
        <img
          src={profilePic}
          alt={alt || 'user'}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Avatar;
