import * as Dialog from "@radix-ui/react-dialog";

export default function Modal({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

function ModalContent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-[dialog-overlay-show_200ms] data-[state=closed]:animate-[dialog-overlay-hide_200ms] fixed inset-0 bg-black/50 p-5" />
      <Dialog.Content className="data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] fixed top-1/2 left-1/2 bg-white text-gray-900 p-8 -translate-x-1/2 -translate-y-1/2 shadow rounded-md w-full text-md max-w-md">
        <div className="flex justify-between items-center">
          <Dialog.Title className="text-xl">{title}</Dialog.Title>
          <Dialog.Close className="items-center flex justify-center p-3 bg-gray-300 hover:bg-gray-400 rounded-full"></Dialog.Close>
        </div>
        {children}
        {/* <ContactForm contact={contact} afterSave={() => setOpen(false)} /> */}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = Dialog.Close;
