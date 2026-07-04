import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react'
import { getPostDetailAPI } from '~/apis'

// Helper functions (identical to Posts.jsx to ensure consistent visual mapping)
const generateRandomImage = (id) => {
  const defaultImages = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
  ]
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

function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getPostDetailAPI(id)
        if (data) {
          const enrichedPost = {
            ...data,
            image: data.image || generateRandomImage(data.id),
            category: data.category || getCategory(data.id),
            readingTime: data.readingTime || getReadingTime(data.content),
            date: formatDate(data.created_at),
          }
          setPost(enrichedPost)
        } else {
          setError('Không tìm thấy bài viết.')
        }
      } catch (err) {
        console.error('Failed to fetch post detail', err)
        setError('Đã xảy ra lỗi khi tải bài viết.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPostDetail()
    }
  }, [id])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#fdfbf7] py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6 animate-pulse">
          {/* Back Button Skeleton */}
          <div className="h-4 bg-[#e7e3dc] w-24 rounded-full mb-8"></div>

          {/* Header Skeleton */}
          <div className="space-y-4 mb-8">
            <div className="h-3 bg-[#e7e3dc] w-20 rounded"></div>
            <div className="h-8 bg-[#e7e3dc] w-3/4 rounded-md"></div>
            <div className="h-8 bg-[#e7e3dc] w-1/2 rounded-md"></div>
            <div className="flex gap-4 pt-4">
              <div className="h-4 bg-[#e7e3dc] w-32 rounded-full"></div>
              <div className="h-4 bg-[#e7e3dc] w-24 rounded-full"></div>
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="w-full aspect-[21/9] bg-[#e7e3dc] rounded-2xl mb-12"></div>

          {/* Content Skeleton */}
          <div className="space-y-6">
            <div className="h-4 bg-[#e7e3dc] w-full rounded"></div>
            <div className="h-4 bg-[#e7e3dc] w-full rounded"></div>
            <div className="h-4 bg-[#e7e3dc] w-5/6 rounded"></div>
            <div className="h-4 bg-[#e7e3dc] w-full rounded"></div>
            <div className="h-4 bg-[#e7e3dc] w-4/5 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="w-full min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center py-20 px-6">
        <div className="text-center space-y-6 max-w-md">
          <h2 className="text-2xl font-bold font-heading text-[#2c2520]">
            {error || 'Không tìm thấy bài viết'}
          </h2>
          <p className="text-[#70655d] text-sm leading-relaxed">
            Bài viết bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại. Vui lòng quay lại danh sách bài viết.
          </p>
          <Link
            to="/posts"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2c2520] hover:bg-[#704f38] text-white rounded-full text-sm font-sans font-semibold transition-all duration-300 shadow-[0_4px_10px_rgba(44,37,32,0.1)] hover:translate-y-[-1px]"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="w-full min-h-screen bg-[#fdfbf7] py-12 md:py-20 animate-fade-in">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link
          to="/posts"
          className="group inline-flex items-center gap-2 text-sm font-sans font-bold text-[#a08e81] hover:text-[#704f38] transition-colors mb-8 no-underline"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[-3px]" />
          <span>Quay lại</span>
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#a08e81] mb-3 block">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-[#2c2520] leading-[1.25] mb-6">
            {post.title}
          </h1>

          {/* Meta Details */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-sans text-[#70655d] border-b border-[#e7e3dc] pb-8">
            <span className="font-semibold text-[#2c2520]">Bởi VBlog Editor</span>
            <span className="text-[#e7e3dc]">•</span>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-[#a08e81]" />
              <span>{post.date}</span>
            </div>
            <span className="text-[#e7e3dc]">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#a08e81]" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12 bg-[#f4f1eb] shadow-[0_8px_30px_rgb(112,79,56,0.04)]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <div 
          className="post-content font-serif text-[17px] md:text-[18px] leading-relaxed text-[#3c2f2f] mb-16 selection:bg-[#704f38]/10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  )
}

export default PostDetailPage
