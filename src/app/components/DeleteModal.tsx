import * as Dialog from '@radix-ui/react-dialog'
import { LuX } from 'react-icons/lu'
import { IoTrashBin } from 'react-icons/io5'
import { Button } from './Button'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  movieTitle: string
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  movieTitle,
}: DeleteModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fadeIn" />

        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-gray-200 text-gray-800 rounded-lg shadow-2xl w-full max-w-md z-50 animate-slideUp"
        >
          <IoTrashBin className="text-6xl mx-auto mb-4 text-red-500" />

          <Dialog.Title className="text-xl font-bold text-gray-900">
            Confirmar Exclusão
          </Dialog.Title>

          <Dialog.Description className="mt-4 text-gray-600 text-center">
            Tem certeza de que deseja excluir o filme{' '}
            <strong className="text-gray-800">{movieTitle}</strong>? <br />
            Esta ação <span className="text-red-500 font-semibold">não pode ser desfeita</span>.
          </Dialog.Description>

          {/* Botões */}
          <div className="flex justify-center gap-4 mt-6">
            {/* Cancelar */}
            <Button
              title="Cancelar"
              size="medium"
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 transition rounded-lg shadow-md"
            />
            {/* Confirmar Exclusão */}
            <Button
              title="Excluir"
              size="medium"
              onClick={onConfirm}
              className="bg-red-500 hover:bg-red-600 transition rounded-lg shadow-md outline-none focus:outline-none focus:ring-0"
            />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <LuX size={24} />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
