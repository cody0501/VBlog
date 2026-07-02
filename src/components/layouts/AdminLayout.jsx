import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Users,
  LogOut
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function AdminLayout() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logoutUserAPI())
  }

  // Hàm kiểm tra tab nào đang active dựa trên URL thực tế
  const isActive = (path) => location.pathname === path

  return (
    <div className="flex min-h-screen bg-[#fdfbf7] text-[#2c2520]">
      {/* SIDEBAR CỐ ĐỊNH CỦA ADMIN */}
      <aside className="w-64 bg-[#fdfbf7] border-r border-[#e7e3dc] flex flex-col justify-between p-6 sticky top-0 h-screen">
        <div className="space-y-8">
          <Link to="/" className="no-underline block group">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#2c2520] leading-tight group-hover:text-[#4a3b32] transition-colors">
              VBlog
            </h2>
            <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#a08e81] mt-1 group-hover:text-[#70655d] transition-colors">
              CMS PORTAL
            </p>
          </Link>

          <nav className="space-y-1 font-sans text-xs font-semibold tracking-wide">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg no-underline transition-colors ${
                isActive('/admin')
                  ? 'bg-[#4a3b32] text-white'
                  : 'text-[#70655d] hover:bg-[#f5f1ea] hover:text-[#2c2520]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </Link>
            <Link
              to="/admin/posts"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg no-underline transition-colors ${
                isActive('/admin/posts')
                  ? 'bg-[#4a3b32] text-white'
                  : 'text-[#70655d] hover:bg-[#f5f1ea] hover:text-[#2c2520]'
              }`}
            >
              <FileText className="w-4 h-4" />
              Posts
            </Link>
            <Link
              to="/admin/books"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg no-underline transition-colors ${
                isActive('/admin/books')
                  ? 'bg-[#4a3b32] text-white'
                  : 'text-[#70655d] hover:bg-[#f5f1ea] hover:text-[#2c2520]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Books Collection
            </Link>
            <Link
              to="/admin/users"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg no-underline transition-colors ${
                isActive('/admin/users')
                  ? 'bg-[#4a3b32] text-white'
                  : 'text-[#70655d] hover:bg-[#f5f1ea] hover:text-[#2c2520]'
              }`}
            >
              <Users className="w-4 h-4" />
              Users
            </Link>
          </nav>
        </div>

        {/* Thông tin Admin dưới đáy Sidebar */}
        <div className="border-t border-[#e7e3dc] pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#4a3b32] flex items-center justify-center text-white font-sans text-xs font-bold shrink-0">
              {currentUser?.user?.email
                ? currentUser.user.email[0].toUpperCase()
                : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#2c2520] truncate m-0">
                Admin User
              </p>
              <p className="text-[10px] text-[#a08e81] truncate m-0 mt-0.5">
                {currentUser?.user?.email || 'usertest01@gmail.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-[#c62828] hover:bg-[#fdeded] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* KHU VỰC HIỂN THỊ NỘI DUNG ĐỘNG CỦA CÁC TRANG ADMIN */}
      <div className="flex-1 overflow-y-auto">
        {/* Outlet này sẽ là nơi render AdminPage hoặc các trang con khác của Admin */}
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
