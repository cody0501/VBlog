import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Plus, ChevronDown, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '~/components/ui/dropdown-menu'
import { getCategoriesAPI, createCategoryAPI, deleteCategoryAPI } from '~/apis'
import { toast } from 'react-toastify'

export default function CreateBookDialog({ isOpen, onOpenChange, onSave }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')

  // Category states
  const [categories, setCategories] = useState([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newCategoryTitle, setNewCategoryTitle] = useState('')

  useEffect(() => {
    if (isOpen) {
      getCategoriesAPI()
        .then(data => {
          setCategories(data || [])
        })
        .catch(err => {
          console.error('Failed to fetch categories:', err)
          toast.error('Không thể tải danh sách thể loại.')
        })
    }
  }, [isOpen])

  const handleToggleSelectCategory = (id) => {
    setSelectedCategoryIds(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    )
  }

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
      try {
        await deleteCategoryAPI(id)
        toast.success('Xóa thể loại thành công!')
        setCategories(prev => prev.filter(c => c.id !== id))
        setSelectedCategoryIds(prev => prev.filter(cId => cId !== id))
      } catch (err) {
        console.error('Failed to delete category:', err)
        toast.error('Không thể xóa thể loại.')
      }
    }
  }

  const handleAddNewCategory = async () => {
    if (!newCategoryTitle.trim()) return
    const newTitle = newCategoryTitle.trim()

    try {
      const res = await createCategoryAPI({ title: newTitle })
      toast.success('Thêm thể loại mới thành công!')
      const created = res.category
      setCategories(prev => [...prev, created])
      setSelectedCategoryIds(prev => [...prev, created.id])
      setNewCategoryTitle('')
      setIsAddingNew(false)
      setIsDropdownOpen(false)
    } catch (err) {
      console.error('Failed to create category:', err)
      toast.error(err.response?.data?.message || 'Không thể tạo thể loại mới.')
    }
  }

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
      cover_image_url: coverImageUrl,
      category: selectedCategoryIds
    })

    // Reset Form & Close
    onOpenChange(false)
    setTitle('')
    setAuthor('')
    setIsbn('')
    setCoverImageUrl('')
    setSelectedCategoryIds([])
    setIsDropdownOpen(false)
    setIsAddingNew(false)
    setNewCategoryTitle('')
  }

  const handleClose = () => {
    onOpenChange(false)
    setSelectedCategoryIds([])
    setIsDropdownOpen(false)
    setIsAddingNew(false)
    setNewCategoryTitle('')
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

          {/* Thể loại (Category) */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-bold text-[#70655d] uppercase">Thể loại (Category)</label>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center justify-between w-full bg-[#fdfbf7] border border-[#e7e3dc] rounded-lg text-xs h-9 px-3 text-[#70655d] font-sans font-medium text-left hover:bg-[#f5f1ea]/40 cursor-pointer transition-colors"
                >
                  <span className="truncate pr-4">
                    {selectedCategoryIds.length > 0
                      ? selectedCategoryIds.map(id => categories.find(c => c.id === id)?.title).filter(Boolean).join(', ')
                      : 'Chọn thể loại...'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#a08e81] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} shrink-0`} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white border border-[#e7e3dc] rounded-xl shadow-lg p-1" align="start">
                {/* Categories items list */}
                <div className="max-h-28 overflow-y-auto flex flex-col p-1">
                  {categories.length > 0 ? (
                    categories.map(cat => {
                      const isSelected = selectedCategoryIds.includes(cat.id)
                      return (
                        <DropdownMenuItem
                          key={cat.id}
                          onSelect={(e) => e.preventDefault()}
                          className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#fdfbf7] transition-colors cursor-pointer group"
                          onClick={() => handleToggleSelectCategory(cat.id)}
                        >
                          <span className={`text-xs ${isSelected ? 'font-bold text-[#2c2520]' : 'text-[#70655d]'}`}>
                            {cat.title} {isSelected && '✓'}
                          </span>

                          {/* Delete category item button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              handleDeleteCategory(cat.id)
                            }}
                            className="p-1 rounded-md hover:bg-[#fdeded] text-[#a08e81] hover:text-[#c62828] transition-colors border-none bg-transparent cursor-pointer opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </DropdownMenuItem>
                      )
                    })
                  ) : (
                    <span className="text-[11px] text-[#a08e81] py-3 text-center">Chưa có thể loại nào</span>
                  )}
                </div>

                <DropdownMenuSeparator className="bg-[#f4f1eb]" />

                {/* Dropdown footer (inline create form) */}
                <div className="bg-[#fdfbf7] p-2 flex flex-col" onClick={(e) => e.stopPropagation()}>
                  {!isAddingNew ? (
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(true)}
                      className="flex items-center justify-center gap-1.5 w-full py-1.5 border border-dashed border-[#e7e3dc] hover:border-[#4a3b32] text-[#70655d] hover:text-[#2c2520] rounded-lg text-xs font-sans font-semibold bg-transparent cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Thêm thể loại mới
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 p-1 w-full">
                      <input
                        type="text"
                        value={newCategoryTitle}
                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                        placeholder="Nhập tên thể loại..."
                        className="flex-1 min-w-0 px-2 py-1 border border-[#e7e3dc] rounded-md text-xs focus:outline-none focus:border-[#4a3b32] bg-white text-[#2c2520]"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNew(false)
                          setNewCategoryTitle('')
                        }}
                        className="px-2 py-1 text-[11px] font-sans font-semibold text-[#70655d] hover:bg-[#f5f1ea] border border-[#e7e3dc] bg-transparent rounded-md cursor-pointer transition-colors shrink-0"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={handleAddNewCategory}
                        className="px-2.5 py-1 text-[11px] font-sans font-semibold text-white bg-[#4a3b32] hover:bg-[#382c25] border-none rounded-md cursor-pointer transition-colors shrink-0"
                      >
                        Lưu
                      </button>
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
              onClick={handleClose}
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
