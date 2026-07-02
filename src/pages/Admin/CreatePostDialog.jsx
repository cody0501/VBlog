import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input'
import TipTapEditor from '~/components/TipTapEditor'

export default function CreatePostDialog({ isOpen, onOpenChange, onSave }) {
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostCategory, setNewPostCategory] = useState('Sách')
  const [newPostStatus, setNewPostStatus] = useState('Published')
  const [newPostContent, setNewPostContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newPostTitle.trim()) {
      alert('Vui lòng nhập tiêu đề!')
      return
    }
    onSave({
      title: newPostTitle,
      category: newPostCategory,
      status: newPostStatus,
      content: newPostContent
    })
    onOpenChange(false)
    // Reset form
    setNewPostTitle('')
    setNewPostCategory('Sách')
    setNewPostStatus('Published')
    setNewPostContent('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-[#e7e3dc]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-[#2c2520] text-lg font-bold">Write New Review Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#70655d] uppercase">Tiêu đề bài viết</label>
            <Input
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Nhập tiêu đề..."
              className="bg-[#fdfbf7] border-[#e7e3dc] rounded-lg focus:border-[#4a3b32] text-xs h-9 px-3"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#70655d] uppercase">Danh mục</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full h-9 bg-[#fdfbf7] border border-[#e7e3dc] rounded-lg text-xs px-3 text-[#2c2520] outline-none focus:border-[#4a3b32] text-left cursor-pointer transition-colors"
                  >
                    <span>{newPostCategory}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#70655d] shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-[#e7e3dc] rounded-lg shadow-md p-1 min-w-[200px]">
                  {['Sách', 'Văn học', 'Phê bình', 'Công nghệ', 'Đời sống', 'Viết lách'].map((cat) => (
                    <DropdownMenuItem
                      key={cat}
                      onClick={() => setNewPostCategory(cat)}
                      className="text-xs px-2.5 py-1.5 text-[#2c2520] hover:bg-[#f5f1ea] rounded-md cursor-pointer transition-colors"
                    >
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#70655d] uppercase">Trạng thái</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full h-9 bg-[#fdfbf7] border border-[#e7e3dc] rounded-lg text-xs px-3 text-[#2c2520] outline-none focus:border-[#4a3b32] text-left cursor-pointer transition-colors"
                  >
                    <span>{newPostStatus}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#70655d] shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-[#e7e3dc] rounded-lg shadow-md p-1 min-w-[200px]">
                  {['Published', 'Draft'].map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setNewPostStatus(status)}
                      className="text-xs px-2.5 py-1.5 text-[#2c2520] hover:bg-[#f5f1ea] rounded-md cursor-pointer transition-colors"
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#70655d] uppercase">Nội dung review</label>
            <TipTapEditor value={newPostContent} onChange={setNewPostContent} />
          </div>
          <DialogFooter className="mt-4 pt-4 border-t border-[#f4f1eb]">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border border-[#e7e3dc] hover:bg-[#f5f1ea] rounded-xl text-xs font-semibold text-[#70655d] transition-colors cursor-pointer border-none bg-transparent"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#4a3b32] hover:bg-[#382c25] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer border-none"
            >
              Lưu bài viết
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
