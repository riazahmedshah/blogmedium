

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="text-xl font-bold">YourBlog</div>
        <nav className="space-x-6">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/write" className="text-gray-600 hover:text-gray-900">Write</a>
          <a href="/topics" className="text-gray-600 hover:text-gray-900">Topics</a>
          <a href="/signin" className="text-gray-600 hover:text-gray-900">Sign In</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Write a Post</button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center py-16 bg-gray-200">
        <h1 className="text-4xl font-bold mb-4">Discover stories that matter to you</h1>
        <input
          type="text"
          className="w-1/2 p-3 rounded shadow-md mb-8"
          placeholder="Search for topics or stories..."
        />
        <div className="w-full bg-white p-5 rounded shadow-lg">
          <img
            src="https://via.placeholder.com/1200x600"
            alt="Featured Blog"
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-bold">Featured Blog Post Title</h2>
          <p className="text-gray-600">A short description or excerpt from the featured blog post to catch the user's attention.</p>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Trending Topics</h2>
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-400">#Technology</button>
          <button className="bg-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-400">#Design</button>
          <button className="bg-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-400">#Programming</button>
        </div>
      </section>

      {/* Blog Post Cards */}
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Example Blog Post Card */}
          <div className="bg-white shadow-md rounded overflow-hidden">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Blog Post"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">Blog Post Title</h3>
              <p className="text-gray-600 mb-4">A short description or summary of the blog post.</p>
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Author"
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-sm text-gray-700">Author Name</div>
                <div className="text-sm text-gray-500">• Date</div>
              </div>
            </div>
          </div>
          {/* Repeat similar blog post cards here */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-6">&copy; 2024 YourBlog. All rights reserved.</p>
          <div className="space-x-6">
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
            <a href="/contact" className="hover:text-gray-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
