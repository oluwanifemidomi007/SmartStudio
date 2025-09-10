import React from 'react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Essential Hair Care Tips for Summer',
      excerpt: 'Learn how to protect and maintain your hair during the hot summer months...',
      image: 'https://via.placeholder.com/400x250?text=Hair+Care',
      date: '2024-01-15',
      category: 'Hair Care',
    },
    {
      id: 2,
      title: 'The Perfect Manicure: Step by Step Guide',
      excerpt: 'Achieve salon-quality nails at home with our comprehensive guide...',
      image: 'https://via.placeholder.com/400x250?text=Manicure',
      date: '2024-01-10',
      category: 'Nail Care',
    },
    {
      id: 3,
      title: 'Skincare Routine for Different Skin Types',
      excerpt: 'Discover the best skincare practices tailored to your specific skin type...',
      image: 'https://via.placeholder.com/400x250?text=Skincare',
      date: '2024-01-05',
      category: 'Skincare',
    },
    {
      id: 4,
      title: 'Trending Hair Colors for 2024',
      excerpt: 'Stay ahead of the curve with these popular hair color trends...',
      image: 'https://via.placeholder.com/400x250?text=Hair+Color',
      date: '2024-01-01',
      category: 'Hair Trends',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          Beauty Blog
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover beauty tips, trends, and expert advice from our team of professionals.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-primary font-semibold">{post.category}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-black dark:text-white mb-3">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <button className="text-primary font-semibold hover:text-black">Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
