import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: typeof data.date === 'string' ? data.date : new Date(data.date).toISOString(),
      excerpt: content.slice(0, 100) + '...',
    }
  })

  posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  return posts
}
