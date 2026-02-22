"use client";
import { useRouter } from "next/navigation";
import { RiErrorWarningLine } from "react-icons/ri"

interface Props {
  Title: string;
  description?: string;
  onAction?: boolean;
}

export const ErrorServer = ({ Title, description, onAction }: Props) => {

  const router = useRouter()

  return (

      <div className="w-full rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-700">
        <div className="flex items-start gap-3">
          <RiErrorWarningLine size={22} className="text-red-500" />

          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm">{Title}</span>
            {description && (
              <p className="text-xs opacity-80 leading-4">{description}</p>
            )}

            {onAction && (
              <button
                onClick={() => router.refresh()}
                className="cursor-pointer self-start text-xs text-red-700 underline hover:text-red-900 transition"
              >
                Reintentar
              </button>
            )}
          </div>
        </div>
      </div>
  );
};
