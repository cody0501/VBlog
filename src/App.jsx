import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'

import MainLayout from './components/layouts/MainLayout'

import AccountVerification from './pages/Auth/AccountVerification'
import AdminPage from './pages/Admin/Admin'
import PostsPage from './pages/Posts'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import HomePage from './pages/Home'
import AuthPage from './pages/Auth/AuthPage'
import PostDetailPage from './pages/PostDetail'
import AdminLayout from './components/layouts/AdminLayout'
import AdminPostsPage from './pages/Admin/Posts'
import AdminCommentsPage from './pages/Admin/Comments'
import AdminSettingPage from './pages/Admin/Settings'
import AdminUsersPage from './pages/Admin/Users'
import AdminBooksPage from './pages/Admin/book/Books'

// Protected Route: Yêu cầu đăng nhập mới được truy cập các Route bên trong
const ProtectedRoute = ({ currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/auth/login" replace={true} />
  }
  return <Outlet />
}

// const ProtectedRoute = () => {
//   return <Outlet />;
// };

// Public Route: Đã đăng nhập rồi thì không cho quay lại trang đăng nhập/đăng ký
const PublicRoute = ({ currentUser }) => {
  if (currentUser) {
    return <Navigate to="/" replace={true} />
  }
  return <Outlet />
}
// const PublicRoute = () => {
//   return <Outlet />;
// };

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route element={<ProtectedRoute currentUser={currentUser} />}>
          {/* 2. ĐƯA ROUTE ADMIN VÀO ĐÂY */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/posts" element={<AdminPostsPage />} />
          <Route path="/admin/books" element={<AdminBooksPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/comments" element={<AdminCommentsPage />} />
          <Route path="/admin/settings" element={<AdminSettingPage />} />
        </Route>
      </Route>
      <Route element={<MainLayout />}>
        {/* Tuyến đường bảo vệ */}

        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* KHỐI ROUTE NGOÀI */}
      <Route element={<PublicRoute currentUser={currentUser} />}>
        <Route path="/auth/login" element={<AuthPage />} />
        <Route path="/auth/register" element={<AuthPage />} />
      </Route>

      <Route path="/account/verification" element={<AccountVerification />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  )
}

export default App
