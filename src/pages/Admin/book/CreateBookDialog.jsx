import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'

export default function CreateBookDialog({ isOpen, onOpenChange, onSave }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Vui lòng nhập tên sách!')
      return
    }
    if (!author.trim()) {
      alert('Vui lòng nhập tên tác giả!')
      return
    }

    onSave({
      title,
      author,
      isbn,
      cover_image_url: coverImageUrl
    })

    // Reset Form & Close
    onOpenChange(false)
    setTitle('')
    setAuthor('')
    setIsbn('')
    setCoverImageUrl('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white border border-[#e7e3dc]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-[#2c2520] text-lg font-bold">Add New Book to Database</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Tên sách */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#70655d] uppercase">Tên sách (Title)</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên sách..."
              className="bg-[#fdfbf7] border-[#e7e3dc] rounded-lg focus:border-[#4a3b32] text-xs h-9 px-3"
              required
            />
          </div>

          {/* Tác giả */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#70655d] uppercase">Tác giả (Author)</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Nhập tên tác giả..."
              className="bg-[#fdfbf7] border-[#e7e3dc] rounded-lg focus:border-[#4a3b32] text-xs h-9 px-3"
              required
            />
          </div>

          {/* ISBN */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#70655d] uppercase">Mã ISBN</label>
            <Input
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Nhập mã ISBN (ví dụ: 978-0325048154)..."
              className="bg-[#fdfbf7] border-[#e7e3dc] rounded-lg focus:border-[#4a3b32] text-xs h-9 px-3"
            />
          </div>

          {/* Đường dẫn ảnh bìa */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#70655d] uppercase">Đường dẫn ảnh bìa (Cover Image URL)</label>
            <Input
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="Nhập link ảnh (https://images.unsplash.com/...)..."
              className="bg-[#fdfbf7] border-[#e7e3dc] rounded-lg focus:border-[#4a3b32] text-xs h-9 px-3"
            />
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
              Thêm sách
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
