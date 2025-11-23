export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">MyLanding</h1>
        <div className="space-x-6">
         <a href="#features" className="cursor-pointer scroll-smooth">
            Features
        </a>
          <a href="#stats">Stats</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
