import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Image as ImageIcon
} from 'lucide-react'

export default function TipTapEditor({ value = '', onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Nhập URL hình ảnh:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const buttons = [
    {
      icon: <Bold className="w-3.5 h-3.5" />,
      title: 'Chữ đậm',
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold')
    },
    {
      icon: <Italic className="w-3.5 h-3.5" />,
      title: 'Chữ nghiêng',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic')
    },
    {
      icon: <Strikethrough className="w-3.5 h-3.5" />,
      title: 'Gạch ngang',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike')
    },
    {
      icon: <Heading1 className="w-3.5 h-3.5" />,
      title: 'Tiêu đề 1',
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 })
    },
    {
      icon: <Heading2 className="w-3.5 h-3.5" />,
      title: 'Tiêu đề 2',
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 })
    },
    {
      icon: <Heading3 className="w-3.5 h-3.5" />,
      title: 'Tiêu đề 3',
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 })
    },
    {
      icon: <List className="w-3.5 h-3.5" />,
      title: 'Danh sách dấu chấm',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList')
    },
    {
      icon: <ListOrdered className="w-3.5 h-3.5" />,
      title: 'Danh sách số',
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList')
    },
    {
      icon: <Quote className="w-3.5 h-3.5" />,
      title: 'Trích dẫn',
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote')
    },
    {
      icon: <Code className="w-3.5 h-3.5" />,
      title: 'Khối mã',
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock')
    }
  ]

  return (
    <div className="border border-[#e7e3dc] rounded-xl overflow-hidden bg-white shadow-sm flex flex-col w-full">
      {/* TOOLBAR */}
      <div className="bg-[#fdfbf7] border-b border-[#e7e3dc] p-2 flex flex-wrap gap-1 items-center">
        {buttons.map((btn, index) => (
          <button
            key={index}
            type="button"
            title={btn.title}
            onClick={btn.onClick}
            className={`p-1.5 rounded transition-all cursor-pointer border-none flex items-center justify-center ${
              btn.isActive
                ? 'bg-[#4a3b32] text-white'
                : 'text-[#70655d] hover:bg-[#f5f1ea] hover:text-[#2c2520]'
            }`}
          >
            {btn.icon}
          </button>
        ))}
        {/* Nút chèn ảnh riêng biệt */}
        <button
          type="button"
          title="Chèn ảnh"
          onClick={addImage}
          className="p-1.5 rounded text-[#70655d] hover:bg-[#f5f1ea] hover:text-[#2c2520] cursor-pointer border-none flex items-center justify-center"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* EDITOR AREA */}
      <div className="p-3 min-h-[220px] max-h-[350px] overflow-y-auto text-xs font-sans text-[#2c2520] bg-white">
        <EditorContent
          editor={editor}
          className="outline-none min-h-[200px] prose max-w-none text-[#2c2520]
            [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px]
            [&_.ProseMirror_p]:mb-2 [&_.ProseMirror_p]:leading-relaxed
            [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-4 [&_.ProseMirror_ol]:mb-2
            [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-4 [&_.ProseMirror_ul]:mb-2
            [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-[#4a3b32] [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-[#70655d] [&_.ProseMirror_blockquote]:mb-2
            [&_.ProseMirror_h1]:text-lg [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-[#2c2520] [&_.ProseMirror_h1]:mb-2 [&_.ProseMirror_h1]:mt-3
            [&_.ProseMirror_h2]:text-base [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:text-[#2c2520] [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h2]:mt-2
            [&_.ProseMirror_h3]:text-sm [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:text-[#2c2520] [&_.ProseMirror_h3]:mb-1
            [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:my-3 [&_.ProseMirror_img]:mx-auto [&_.ProseMirror_img]:block [&_.ProseMirror_img]:border [&_.ProseMirror_img]:border-[#e7e3dc]"
        />
      </div>
    </div>
  )
}
