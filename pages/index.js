import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllPosts } from '@/lib/posts'

export default function Home({ posts }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Head>
        <title>我的个人主页</title>
        <meta name="description" content="个人主页与博客" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">我的主页</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="#about" className="hover:text-blue-500">关于</Link>
            <Link href="#blog" className="hover:text-blue-500">博客</Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <header className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-4">欢迎来到我的主页</h1>
          <p className="text-xl mb-6">分享我的故事与技术博客</p>
          <Link href="#blog">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-200 transition">
              查看博客
            </button>
          </Link>
        </motion.div>
      </header>

      <section id="about" className="py-20 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">关于我</h2>
        <p className="text-lg text-center">
          我是一名热爱技术的开发者，喜欢分享编程经验和生活感悟。
        </p>
      </section>

      <section id="blog" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">我的博客</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg"
              >
                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-500">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{post.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 bg-gray-200 dark:bg-gray-900 text-center">
        <p>&copy; 2025 我的个人主页. 保留所有权利.</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  return {
    props: {
      posts,
    },
  }
}
