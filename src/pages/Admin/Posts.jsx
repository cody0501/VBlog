import { useState } from 'react'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import CreatePostDialog from './CreatePostDialog'

function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Dialog state
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  // Giả lập danh sách bài viết chi tiết hơn phục vụ cho quản trị
  // eslint-disable-next-line no-unused-vars
  const mockPosts = [
    {
      id: 1,
      title: 'The Architecture of Silence in Modern Prose',
      category: 'Văn học',
      author: 'E. Rutherford',
      date: 'Oct 24, 2023',
      views: '12,450',
      status: 'Published'
    },
    {
      id: 2,
      title: 'Review: The Weight of Ink',
      category: 'Sách',
      author: 'J. Mitchell',
      date: 'Oct 22, 2023',
      views: '3,120',
      status: 'Draft'
    },
    {
      id: 3,
      title: 'Revisiting the Classics: A 21st Century Perspective',
      category: 'Phê bình',
      author: 'A. Admin',
      date: 'Oct 18, 2023',
      views: '45,800',
      status: 'Published'
    },
    {
      id: 4,
      title: 'Xây Dựng Giao Diện Người Dùng Tinh Tế Với CSS Hiện Đại',
      category: 'Công nghệ',
      author: 'A. Admin',
      date: 'Oct 15, 2023',
      views: '8,940',
      status: 'Published'
    },
    {
      id: 5,
      title: 'Đi Tìm Sự Yên Lặng Giữa Thế Giới Ồn Ào',
      category: 'Đời sống',
      author: 'J. Mitchell',
      date: 'Oct 10, 2023',
      views: '0',
      status: 'Draft'
    },
    {
      id: 6,
      title: 'Thói Quen Viết Morning Pages: Giải Phóng Sức Sáng Tạo',
      category: 'Viết lách',
      author: 'E. Rutherford',
      date: 'Oct 05, 2023',
      views: '15,210',
      status: 'Published'
    }
  ]

  const [listPosts, setListPosts] = useState([])

  // Xử lý bộ lọc tìm kiếm & trạng thái
  const filteredPosts = listPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'All' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSavePost = ({ title, category, status, content }) => {
    const newPost = {
      id: listPosts.length + 1,
      title,
      category,
      author: 'A. Admin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: '0',
      status,
      content
    }
    console.log('>>> Dữ liệu bài viết mới lưu:', newPost)
    setListPosts([newPost, ...listPosts])
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-10 flex flex-col gap-6 box-border">
      {/* 1. TOP HEADER (Tiêu đề & Nút Thêm bài viết mới) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e3dc]/50 pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2c2520]">
            Manage Posts
          </h1>
          <p className="text-xs sm:text-sm text-[#70655d] mt-1">
            Create, edit, and organize all editorial pieces published on your
            blog.
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4a3b32] hover:bg-[#382c25] text-white rounded-xl border-none font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm shrink-0 animate-fade-in"
        >
          <Plus className="w-4 h-4" />
          Write New Post
        </button>
        <CreatePostDialog
          isOpen={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onSave={handleSavePost}
        />
      </div>

      {/* 2. BỘ LỌC & TÌM KIẾM (Thanh công cụ linh hoạt trên mọi thiết bị) */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white p-4 rounded-xl border border-[#e7e3dc]/60 shadow-[0_2px_12px_-3px_rgba(112,79,56,0.02)]">
        {/* Ô Tìm Kiếm */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08e81]" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#fdfbf7] border border-[#e7e3dc] rounded-lg font-sans text-xs focus:outline-none focus:border-[#4a3b32] text-[#2c2520] transition-colors"
          />
        </div>

        {/* Cụm bộ lọc trạng thái */}
        <div className="flex items-center gap-2 overflow-x-auto font-sans text-xs font-semibold">
          <span className="text-[#a08e81] flex items-center gap-1 shrink-0 mr-1 hidden sm:flex">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {['All', 'Published', 'Draft'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg border cursor-pointer transition-all whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-[#4a3b32] text-white border-[#4a3b32]'
                  : 'bg-[#fdfbf7] border-[#e7e3dc] text-[#70655d] hover:border-[#a08e81]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 3. BẢNG DANH SÁCH BÀI VIẾT QUẢN TRỊ */}
      <div className="bg-white border border-[#e7e3dc]/80 rounded-2xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(112,79,56,0.03)] flex flex-col">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left font-sans text-xs min-w-[800px]">
            <thead>
              <tr className="border-b border-[#f4f1eb] bg-[#fdfbf7] text-[#a08e81] font-bold uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold w-[40%]">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Views</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center w-[120px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f1eb] text-[#70655d] font-medium">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-[#fdfbf7]/50 transition-colors group"
                  >
                    {/* Title & icon bài viết */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-[#a08e81] mt-0.5 shrink-0" />
                        <span className="text-[#2c2520] font-semibold line-clamp-2 leading-relaxed">
                          {post.title}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-[#f5f1ea] text-[#70655d] px-2 py-1 rounded text-[10px] font-bold">
                        {post.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="px-6 py-4 whitespace-nowrap text-[#2c2520]">
                      {post.author}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-[#a08e81] whitespace-nowrap">
                      {post.date}
                    </td>

                    {/* Views */}
                    <td className="px-6 py-4 font-mono whitespace-nowrap">
                      {post.views}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          post.status === 'Published'
                            ? 'bg-[#edf7ed] text-[#2e7d32]'
                            : 'bg-[#f5f1ea] text-[#70655d]'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    {/* Khối quản trị hành động nhanh */}
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-[#70655d] hover:text-[#2c2520] hover:bg-[#f5f1ea] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                          title="Xem trước"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 text-[#704f38] hover:text-[#4a3b32] hover:bg-[#f5f1ea] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                          title="Sửa bài"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 text-[#c62828] hover:text-[#b71c1c] hover:bg-[#fdeded] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                          title="Xóa bài"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center font-sans text-sm text-[#a08e81]"
                  >
                    No posts found matching your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER PHÂN TRANG (Pagination dành riêng cho trang Admin) */}
        <div className="px-4 sm:px-6 py-4 border-t border-[#f4f1eb] flex items-center justify-between font-sans text-xs font-semibold text-[#70655d]">
          <span className="hidden sm:inline">
            Showing <span className="text-[#2c2520]">1</span> to{' '}
            <span className="text-[#2c2520]">{filteredPosts.length}</span> of{' '}
            <span className="text-[#2c2520]">{filteredPosts.length}</span>{' '}
            entries
          </span>
          <span className="sm:hidden">Page 1 of 1</span>

          <div className="flex items-center gap-1">
            <button
              className="p-1.5 border border-[#e7e3dc] rounded-lg bg-white text-[#a08e81] cursor-not-allowed"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 bg-[#4a3b32] text-white rounded-lg border-none cursor-pointer">
              1
            </button>
            <button className="p-1.5 border border-[#e7e3dc] rounded-lg bg-white text-[#70655d] hover:border-[#a08e81] cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPostsPage
