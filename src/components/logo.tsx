import Image from "next/image";

export function Logo() {
  return (
    <div className="relative overflow-hidden">
      <Image
        src="/logo.jpg" // Path relative to the 'public' folder
        alt="College Management Logo"
        layout="responsive" // Ensures responsiveness
        width={200} // Adjust as per your requirements
        height={100} // Adjust as per your requirements
        priority // Optimizes for LCP by preloading
      />
    </div>
  );
}
