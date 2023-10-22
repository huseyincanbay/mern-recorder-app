import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <Link to="/" className="text-white text-3xl font-semibold">
            Ete
          </Link>
        </div>

        <div className="flex items-center justify-center flex-grow">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/companies" className="text-white hover:text-gray-300">
                Companies
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-white hover:text-gray-300">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-white bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-700 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:bg-gradient-to-br dark:from-indigo-800 dark:via-purple-800 dark:to-blue-600 dark:hover:from-indigo-900 dark:hover:via-purple-900 dark:hover:to-blue-700 dark:focus:ring-blue-800">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
