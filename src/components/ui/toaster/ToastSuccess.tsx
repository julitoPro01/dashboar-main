import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { ExternalToast, toast } from "sonner";

interface Props {
  title: string;
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

export const ToastSuccess = (value: Props, data?: ExternalToast) => {
  const { title, description, link, acction, activeBtnClose } = value;

  toast.custom(
    (t) => (
      <div
        className={`relative flex w-[320px] items-start gap-3 rounded-xl border border-neutral-800 
                    bg-neutral-950 p-4 text-sm text-neutral-200 shadow-lg transition-all duration-300`}
      >
        {/* Icono */}
        <div className=" text-green-500">
          <BiCheckCircle className="w-5 h-5" />
        </div>

        {/* Contenido */}
        <div className="flex-1 space-y-1">
          <h1 className="font-semibold text-neutral-100">{title}</h1>
          {description && (
            <p className="text-neutral-400 text-[13px] leading-tight">
              {description}
            </p>
          )}

          {/* Link opcional */}
          {link && (
            <Link
              href={link.href}
              className="text-green-400 hover:text-green-300 text-sm underline underline-offset-2"
            >
              {link.title}
            </Link>
          )}

          {/* Acción opcional */}
          {acction && (
            <button
              onClick={() => acction.func()}
              className="mt-1 rounded-md bg-green-600 px-3 mx-2 py-1 text-xs font-medium text-white hover:bg-green-500 transition"
            >
              {acction.title}
            </button>
          )}
        </div>

        {/* Botón cerrar */}
        {activeBtnClose && (
          <button
            onClick={() => toast.dismiss(t)}
            className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-300"
          >
            <CgClose className="w-4 h-4" />
          </button>
        )}
      </div>
    ),
    data
  );
};
