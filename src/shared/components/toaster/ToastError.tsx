import Link from "next/link";
import { BiXCircle } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { ExternalToast, toast } from "sonner";

interface Props {
  title: string;
  defaultMsgDesc?: boolean;
  description?: string;
  link?: {
    href: string;
    title: string;
  };
  acction?: {
    func: () => void;
    title: string;
  };
  activeBtnClose?: boolean;
}

export const ToastError = (value: Props, data?: ExternalToast) => {
  const { title, description, link, acction, activeBtnClose, defaultMsgDesc } = value;

  toast.custom(
    (t) => (
      <div
        className="relative flex flex-col w-[320px] items-start gap-3 rounded-xl border border-red-800/40 
                   bg-neutral-950 p-4 text-sm text-neutral-200 shadow-lg transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          {/* Icono */}
          <div className=" text-red-500">
            <BiXCircle className="w-5 h-5" />
          </div>

          {/* Contenido */}
          <div className="flex-1 space-y-1">
            <h1 className="font-semibold text-red-400">{title}</h1>

            {defaultMsgDesc
              ? <p className="text-neutral-400 text-[13px] leading-tight">
                Error interno del servidor, intente de nuevo mas tarde.
              </p>
              : description && (
                <p className="text-neutral-400 text-[13px] leading-tight">
                  {description}
                </p>
              )}

            {link && (
              <Link
                href={link.href}
                className="text-red-400 hover:text-red-300 text-sm underline underline-offset-2"
              >
                {link.title}
              </Link>
            )}

            {acction && (
              <button
                onClick={() => acction.func()}
                className="mt-1 rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-500 transition"
              >
                {acction.title}
              </button>
            )}
          </div>

          {activeBtnClose && (
            <button
              onClick={() => toast.dismiss(t)}
              className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-300"
            >
              <CgClose className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="text-end text-[10px] text-neutral-400 w-full">
          <span> {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    ),
    data
  );
};
