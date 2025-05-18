import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-sm mb-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-lg font-semibold">Multi-Agent System</span>
            </div>
            <div className="ml-6 flex space-x-4 items-center">
              {/* Fix: Use div instead of spans inside Link to avoid nested <a> tags */}
              <Link href="/">
                <div className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${location === "/" ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  Chat UI
                </div>
              </Link>
              <Link href="/org-chart">
                <div className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${location === "/org-chart" ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  Organization Chart
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}