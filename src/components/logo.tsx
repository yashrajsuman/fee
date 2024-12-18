export function Logo() {
  return (
    <div className="relative overflow-hidden">
      <img
        src="logo.jpg" // Path relative to the 'public' folder
        alt="College Management Logo"
        className="object-cover w-full h-full"
      />
    </div>
  );
}
