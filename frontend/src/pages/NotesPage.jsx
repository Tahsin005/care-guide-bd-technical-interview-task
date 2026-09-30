import { useState, useMemo } from 'react';
import { Navbar } from '../components/common/Navbar';
import { useAuthStore } from '../store/authStore';
import {
  useNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} from '../hooks/useNotes';
import { NotesTable } from '../components/notes/NotesTable';
import { NoteModal } from '../components/notes/NoteModal';
import { DeleteConfirmModal } from '../components/notes/DeleteConfirmModal';
import {
  Plus,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

export function NotesPage() {
  const { user } = useAuthStore();
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isError, refetch } = useNotes(page, limit);
  const createMutation = useCreateNote();
  const updateMutation = useUpdateNote();
  const deleteMutation = useDeleteNote();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const notes = useMemo(() => data?.notes || [], [data?.notes]);
  const pagination = data?.pagination || {
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handleOpenCreate = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleSaveNote = async ({ title, content }) => {
    if (selectedNote && selectedNote._id) {
      await updateMutation.mutateAsync({
        id: selectedNote._id,
        data: { title, content },
      });
    } else {
      await createMutation.mutateAsync({ title, content });
    }
    handleCloseModal();
  };

  const handleDeleteRequest = (note) => {
    setNoteToDelete(note);
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;
    await deleteMutation.mutateAsync(noteToDelete._id);
    setNoteToDelete(null);
    if (selectedNote && selectedNote._id === noteToDelete._id) {
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] text-[#1e293b] flex flex-col selection:bg-[#3d6157] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b]">
              My Notes
            </h1>
            <p className="mt-1 text-sm text-[#59766e]">
              Welcome back, {user?.name}! 
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-3xl border border-[#e6e9ed] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e6e9ed] bg-[#f8fafc]/80 text-[#59766e] text-[11px] font-semibold uppercase tracking-wider">
                    <th className="py-4 pl-6 pr-4">Title</th>
                    <th className="py-4 px-4">Preview</th>
                    <th className="py-4 px-4">Last Modified</th>
                    <th className="py-4 px-4 hidden sm:table-cell">Length</th>
                    <th className="py-4 pl-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#f4f6f8]" />
                          <div className="h-4 bg-[#f4f6f8] rounded-md w-32" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-3 bg-[#f4f6f8] rounded-md w-48" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-6 bg-[#f4f6f8] rounded-full w-24" />
                      </td>
                      <td className="py-4 px-4 hidden sm:table-cell">
                        <div className="h-3 bg-[#f4f6f8] rounded-md w-14" />
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right">
                        <div className="h-6 bg-[#f4f6f8] rounded-md w-14 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : isError ? (
          <div className="bg-white rounded-3xl p-10 border border-[#e6e9ed] text-center space-y-4 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1e293b]">Failed to load notes</h3>
              <p className="mt-1 text-xs text-[#59766e]">
                An error occurred while fetching your notes from the server.
              </p>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-4 py-2 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl transition-all"
            >
              Try Again
            </button>
          </div>
        ) : notes.length === 0 ? (
          <div className="rounded-3xl p-12 text-center space-y-5 max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-[#1e293b]">No notes yet</h3>
              <p className="text-md text-[#59766e] max-w-sm mx-auto leading-relaxed">
                Create your first rich-text note to capture ideas, meeting points, and research notes.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-md font-semibold rounded-xl shadow-xs hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Note</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <NotesTable
              notes={notes}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteRequest}
            />

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-[#e6e9ed]">
                <p className="text-xs text-[#59766e]">
                  Page {pagination.page} of {pagination.totalPages} ({pagination.total} total notes)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={!pagination.hasPrevPage}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#e6e9ed] rounded-xl text-xs font-semibold text-[#1e293b] hover:bg-[#f4f6f8] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!pagination.hasNextPage}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#e6e9ed] rounded-xl text-xs font-semibold text-[#1e293b] hover:bg-[#f4f6f8] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        note={selectedNote}
        onSave={handleSaveNote}
        onDeleteRequest={handleDeleteRequest}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmModal
        isOpen={Boolean(noteToDelete)}
        onClose={() => setNoteToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Note"
        message={
          noteToDelete
            ? `Are you sure you want to permanently delete "${noteToDelete.title}"?`
            : ''
        }
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

export default NotesPage;
