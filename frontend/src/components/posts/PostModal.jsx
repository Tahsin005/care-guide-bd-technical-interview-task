import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
  X,
  Send,
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
  Undo2,
  Redo2,
  Minus,
} from 'lucide-react';

function PostModalDialog({ onClose, onSave, isLoading }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your post content here...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class:
          'tiptap prose prose-sm focus:outline-hidden min-h-[200px] max-h-[360px] overflow-y-auto px-4 py-3 text-[#1e293b]',
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Post title is required');
      return;
    }

    if (!editor) return;

    const contentHtml = editor.getHTML();
    const plainText = editor.getText();

    if (!plainText.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    try {
      await onSave({
        title: title.trim(),
        content: contentHtml,
      });
    } catch (err) {
      setError(err?.message || 'Failed to create post');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e6e9ed] flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6e9ed]">
          <h2 className="text-lg font-bold text-[#1e293b]">Create New Post</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 text-[#59766e] hover:text-[#1e293b] hover:bg-[#f4f6f8] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {error}
            </div>
          )}


          <div className="px-6 pt-4 pb-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
              disabled={isLoading}
              className="w-full text-lg font-bold text-[#1e293b] placeholder:text-[#94a3b8] bg-transparent border-0 border-b border-[#e6e9ed] pb-2 focus:border-[#3d6157] focus:ring-0 outline-hidden transition-all"
            />
          </div>


          {editor && (
            <div className="flex flex-wrap items-center gap-1 px-6 py-2 border-b border-[#e6e9ed] bg-[#f8fafc]/70 text-[#59766e]">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={isLoading}
                title="Bold"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('bold')
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <Bold className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={isLoading}
                title="Italic"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('italic')
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <Italic className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={isLoading}
                title="Strikethrough"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('strike')
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <Strikethrough className="w-3.5 h-3.5" />
              </button>

              <div className="w-px h-4 bg-[#e2e8f0] mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                disabled={isLoading}
                title="Heading 1"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('heading', { level: 1 })
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <Heading1 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                disabled={isLoading}
                title="Heading 2"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('heading', { level: 2 })
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <Heading2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                disabled={isLoading}
                title="Heading 3"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('heading', { level: 3 })
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <Heading3 className="w-3.5 h-3.5" />
              </button>

              <div className="w-px h-4 bg-[#e2e8f0] mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={isLoading}
                title="Bullet List"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('bulletList')
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={isLoading}
                title="Ordered List"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('orderedList')
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                disabled={isLoading}
                title="Blockquote"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('blockquote')
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <Quote className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                disabled={isLoading}
                title="Code Block"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${editor.isActive('codeBlock')
                    ? 'bg-[#3d6157] text-white'
                    : 'hover:bg-[#e2e8f0] text-[#1e293b]'
                  }`}
              >
                <Code className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                disabled={isLoading}
                title="Horizontal Rule"
                className="p-1.5 rounded-lg text-xs hover:bg-[#e2e8f0] text-[#1e293b] transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div className="w-px h-4 bg-[#e2e8f0] mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo() || isLoading}
                title="Undo"
                className="p-1.5 rounded-lg text-xs hover:bg-[#e2e8f0] text-[#1e293b] transition-colors cursor-pointer disabled:opacity-40"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo() || isLoading}
                title="Redo"
                className="p-1.5 rounded-lg text-xs hover:bg-[#e2e8f0] text-[#1e293b] transition-colors cursor-pointer disabled:opacity-40"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}


          <div className="flex-1 overflow-y-auto p-2 bg-white">
            <EditorContent editor={editor} />
          </div>


          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e6e9ed] bg-[#f8fafc]/50">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-[#59766e] hover:text-[#1e293b] hover:bg-[#e6e9ed]/50 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Publishing...' : 'Publish Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function PostModal({ isOpen, onClose, onSave, isLoading = false }) {
  if (!isOpen) return null;

  return (
    <PostModalDialog
      key="new-post-dialog"
      onClose={onClose}
      onSave={onSave}
      isLoading={isLoading}
    />
  );
}

export default PostModal;
