import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Clock, Search } from 'lucide-react'
import CustomPagination from '~/components/CustomPagination'
import { getListPostsAPI } from '~/apis'

const POSTS_PER_PAGE = 9
const CATEGORIES = ['Tất cả', 'CÔNG NGHỆ', 'ĐỜI SỐNG', 'VIẾT LÁCH', 'TRẢI NGHIỆM']

// Helper functions to generate mock data for missing fields
const generateRandomImage = (id) => {
  const defaultImages = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
  ]
  // Extract number from id if string, else use directly, or fallback to random
  let numId = typeof id === 'number' ? id : parseInt(id?.toString().replace(/\D/g, '') || '0', 10)
  return defaultImages[numId % defaultImages.length]
}

const getReadingTime = (content) => {
  const textLength = content?.length || 0
  const time = Math.max(1, Math.ceil(textLength / 500))
  return `${time} phút đọc`
}

const getCategory = (id) => {
  const categories = ['CÔNG NGHỆ', 'ĐỜI SỐNG', 'VIẾT LÁCH', 'TRẢI NGHIỆM']
  let numId = typeof id === 'number' ? id : parseInt(id?.toString().replace(/\D/g, '') || '0', 10)
  return categories[numId % categories.length]
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toISOString().split('T')[0]
  } catch (error) {
    return dateString
  }
}

function PostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const data = await getListPostsAPI()
        // Format and enrich data
        if (data && Array.isArray(data.posts || data)) {
          const rawPosts = Array.isArray(data) ? data : data.posts
          const enrichedPosts = rawPosts.map((post) => ({
            ...post,
            image: post.image || generateRandomImage(post.id),
            category: post.category || getCategory(post.id),
            readingTime: post.readingTime || getReadingTime(post.content),
            date: formatDate(post.created_at),
            // plain text excerpt if excerpt is not available
            excerpt: post.excerpt || (post.content ? post.content.replace(/<[^>]+>/g, '').substring(0, 120) + '...' : '')
          }))
          // Sort by newest first
          enrichedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          setPosts(enrichedPosts)
        }
      } catch (error) {
        console.error('Failed to fetch posts', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Filter posts based on search term and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCategory = selectedCategory === 'Tất cả' || post.category === selectedCategory
      return matchSearch && matchCategory
    })
  }, [posts, searchTerm, selectedCategory])

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Reset page to 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7]">
      {/* Header Section */}
      <section className="w-full max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2c2520] tracking-tight mb-4">
          Khám Phá Bài Viết
        </h1>
        <p className="text-lg text-[#70655d] max-w-2xl mx-auto">
          Những góc nhìn mới mẻ, câu chuyện thú vị và kiến thức chuyên sâu về công nghệ, đời sống và sự sáng tạo.
        </p>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 pb-20">
        {/* Toolbar: Search & Categories */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          {/* Categories Tab */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-colors ${selectedCategory === cat
                    ? 'bg-[#2c2520] text-white'
                    : 'bg-white text-[#70655d] border border-[#e7e3dc] hover:bg-[#f4f1eb]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e7e3dc] rounded-full text-sm font-sans focus:outline-none focus:border-[#a08e81] focus:ring-1 focus:ring-[#a08e81] transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08e81]" />
          </div>
        </div>

        {/* Grid danh sách bài viết */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((skel) => (
              <div key={skel} className="w-full aspect-[4/5] bg-white border border-[#e7e3dc] rounded-2xl animate-pulse">
                <div className="w-full aspect-[16/10] bg-[#f4f1eb] rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-3 bg-[#e7e3dc] rounded w-1/4"></div>
                  <div className="h-5 bg-[#e7e3dc] rounded w-3/4"></div>
                  <div className="h-16 bg-[#e7e3dc] rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-[#70655d]">Không tìm thấy bài viết nào phù hợp.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="group block no-underline bg-white border border-[#e7e3dc]/80 rounded-2xl overflow-hidden shadow-[0_4px_15px_-3px_rgba(112,79,56,0.03)] flex flex-col transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(112,79,56,0.06)] hover:translate-y-[-2px]"
              >
                {/* Khối ảnh bọc trên */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-[#f4f1eb]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Khối nội dung chữ */}
                <div className="p-6 grow flex flex-col space-y-3">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#a08e81]">
                    {post.category}
                  </span>

                  <h4 className="text-lg font-bold text-[#2c2520] group-hover:text-[#704f38] leading-[1.4] transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-sm text-[#70655d] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Khối chân trang card chứa Metadata */}
                <div className="px-6 pb-6 pt-2 flex items-center gap-4 font-sans text-[11px] text-[#a08e81] border-t border-[#fdfbf7]">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Phân trang */}
        {!loading && totalPages > 1 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </div>
  )
}

export default PostsPage
