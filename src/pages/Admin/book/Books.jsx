import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '~/components/ui/table'
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  BookMarked
} from 'lucide-react'
import CreateBookDialog from './CreateBookDialog'
import UpdateBookDialog from './UpdateBookDialog'
import { createNewBookAPI, deleteBookAPI, getListBooksAPI, updateBookAPI } from '~/apis'
import { toast } from 'react-toastify'
import CustomPagination from '~/components/CustomPagination'
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'

function AdminBooksPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [listBooks, setListBooks] = useState([])
  const [totalPages, setTotalPages] = useState(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const page = parseInt(searchParams.get('page') || DEFAULT_PAGE, 10)

  // Dialog state
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  const fetchBooks = (pageNumber) => {
    getListBooksAPI(`?page=${pageNumber}&limit=${DEFAULT_ITEMS_PER_PAGE}`)
      .then(res => {
        setListBooks(res.books)
        setTotalPages(Math.ceil(res.totalItem / DEFAULT_ITEMS_PER_PAGE))
      })
  }

  useEffect(() => {
    fetchBooks(page)
  }, [page])

  const handlePageChange = newPage => {
    navigate(`?page=${newPage}`)
  }

  const handleSaveBook = async ({ title, author, isbn, cover_image_url, category }) => {
    const newBook = {
      title,
      author,
      isbn,
      cover_image_url,
      category
    }
    console.log('🚀 ~ handleSaveBook ~ newBook:', newBook)
    await createNewBookAPI(newBook)
    fetchBooks(page)
  }

  const handleDeleteBook = async (bookId) => {
    await toast.promise(
      deleteBookAPI(bookId),
      { pending: 'Deleting book...' }
    ).then(res => {
      if (!res.error) {
        if (listBooks.length === 1 && page > 1) {
          navigate(`?page=${page - 1}`)
        } else {
          fetchBooks(page)
        }
      }
    })
  }

  const handleUpdateBook = async (bookId, originalBook, updatedData) => {
    const updatePayload = {}
    const fields = ['title', 'author', 'isbn', 'cover_image_url']

    fields.forEach(field => {
      const newVal = (updatedData[field] !== undefined ? updatedData[field] : '').trim()
      const oldVal = (originalBook[field] || '').trim()

      if (newVal !== '' && newVal !== oldVal) {
        updatePayload[field] = newVal
      }
    })

    if (updatedData.category !== undefined) {
      const newCats = updatedData.category || []
      const oldCats = originalBook.category || []
      const isChanged = newCats.length !== oldCats.length || newCats.some(id => !oldCats.includes(id))
      if (isChanged) {
        updatePayload.category = newCats
      }
    }

    if (Object.keys(updatePayload).length === 0) {
      toast.info('Không có thay đổi nào được phát hiện.')
      return
    }

    await toast.promise(
      updateBookAPI(bookId, updatePayload),
      { pending: 'Updating book...' }
    ).then(res => {
      if (!res.error) {
        fetchBooks(page)
      }
    })
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-10 flex flex-col gap-6 box-border">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e3dc]/50 pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2c2520]">
            Books Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#70655d] mt-1">
            Manage your books database, sync with review articles.
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4a3b32] hover:bg-[#382c25] text-white rounded-xl border-none font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Book
        </button>
      </div>

      {/* 2. TOOLBAR (Search Only) */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white p-4 rounded-xl border border-[#e7e3dc]/60 shadow-[0_2px_12px_-3px_rgba(112,79,56,0.02)]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08e81]" />
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            className="w-full pl-9 pr-4 py-2 bg-[#fdfbf7] border border-[#e7e3dc] rounded-lg font-sans text-xs focus:outline-none focus:border-[#4a3b32] text-[#2c2520] transition-colors"
          />
        </div>
      </div>

      {/* 3. BOOKS TABLE LIST */}
      <div className="bg-white border border-[#e7e3dc]/80 rounded-2xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(112,79,56,0.03)] flex flex-col">
        <Table className="font-sans text-xs">
          <TableHeader>
            <TableRow className="border-b border-[#f4f1eb] bg-[#fdfbf7] hover:bg-[#fdfbf7]">
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81] w-[35%]">Book</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81]">Thể loại</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81]">ISBN</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81]">Created At</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81] text-center w-28">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[#70655d] font-medium">
            {listBooks.length > 0 ? (
              listBooks.map((book, index) => (
                <TableRow
                  key={book.id || book.isbn || index}
                  className="border-b border-[#f4f1eb] hover:bg-[#fdfbf7]/50 transition-colors group"
                >
                  {/* Book cover, title & author */}
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Mini Book Cover */}
                      {book.cover_image_url ? (
                        <img
                          src={book.cover_image_url}
                          alt={book.title}
                          className="w-9 h-12 rounded-md object-cover border border-[#e7e3dc] shrink-0 shadow-xs"
                        />
                      ) : (
                        <div className="w-9 h-12 rounded-md bg-[#4a3b32] flex items-center justify-center text-white shrink-0 shadow-xs">
                          <BookMarked className="w-4 h-4 text-white/80" />
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <span className="text-[#2c2520] font-semibold block truncate">
                          {book.title}
                        </span>
                        <span className="text-[#a08e81] text-[11px] font-normal block truncate mt-0.5">
                          by {book.author}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Thể loại (Category) */}
                  <TableCell className="px-6 py-4 whitespace-nowrap text-xs text-[#70655d]">
                    {book.category || 'N/A'}
                  </TableCell>

                  {/* ISBN */}
                  <TableCell className="px-6 py-4 whitespace-nowrap font-mono text-[11px]">
                    {book.isbn || 'N/A'}
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="px-6 py-4 text-[#a08e81] whitespace-nowrap">
                    {book.created_at}
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 text-[#704f38] hover:text-[#4a3b32] hover:bg-[#f5f1ea] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                        onClick={() => {
                          setEditingBook(book)
                          setIsUpdateOpen(true)
                        }}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="p-1.5 text-[#c62828] hover:text-[#b71c1c] hover:bg-[#fdeded] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                        onClick={ () => { handleDeleteBook(book.id) } }
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="px-6 py-10 text-center font-sans text-sm text-[#a08e81]"
                >
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="bg-[#fdfbf7] py-3 border-t border-[#f4f1eb]">
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <CreateBookDialog
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSave={handleSaveBook}
      />

      {isUpdateOpen && editingBook && (
        <UpdateBookDialog
          isOpen={isUpdateOpen}
          onOpenChange={setIsUpdateOpen}
          onSave={(updatedData) => handleUpdateBook(editingBook.id, editingBook, updatedData)}
          book={editingBook}
        />
      )}
    </div>
  )
}

export default AdminBooksPage
