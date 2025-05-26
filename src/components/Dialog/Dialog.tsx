import { useRef, useEffect, type ReactNode } from "react";

type DialogProps = {
  children: ReactNode;
  isOpen: boolean;
  closeDialogCallback: () => void;
};

function Dialog({ children, isOpen, closeDialogCallback }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const onClickOutsideOfDialog = (e: MouseEvent) => {
      if (!isOpen || !dialogRef.current) return;

      if (e.target === dialogRef.current) {
        dialogRef.current.close();
        closeDialogCallback();
      }
    };

    if (!dialogRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
      document.body.style.overflow = "auto";
    }

    window.addEventListener("click", onClickOutsideOfDialog);

    return () => {
      window.removeEventListener("click", onClickOutsideOfDialog);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeDialogCallback]);

  return (
    <dialog className="flex items-center justify-center p-4 w-screen h-screen bg-transparent" ref={dialogRef}>
      <div className="bg-white rounded-xl p-8 border-gray-500 border-1">
        {children}
      </div>
    </dialog>
  );
}

export default Dialog;