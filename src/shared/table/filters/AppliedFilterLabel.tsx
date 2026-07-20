"use client";

import { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

type LabelProps = {
  onClick: () => void;
  label: string;
};

export const AppliedFilterLabel = ({
  label,
  onClick,
}: LabelProps) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });

  const onEnter = () => {
    if (!nodeRef.current) return;

    const rect = nodeRef.current.getBoundingClientRect();

    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const onLeave = () => {
    setTooltip((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  return (
    <>
      <div
        className="absolute z-20 left-0 right-0 -bottom-2 flex px-4 whitespace-nowrap select-none"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div
          ref={nodeRef}
          className="
          flex items-center gap-1 max-w-full overflow-hidden
          rounded-full border shadow-sm backdrop-blur-sm
          bg-blue-50 dark:bg-blue-500/10
          border-blue-200 dark:border-blue-400/20
        "
        >
          <button
            onClick={onClick}
            className="
            shrink-0 rounded-full
            transition-colors duration-150
            bg-blue-500/10 border border-blue-400/50 hover:bg-blue-600
            text-blue-700 dark:text-blue-50 hover:text-white
          "
          >
            <IoIosClose size={16} />
          </button>

          <span
            className="
            px-0.5 pr-1 text-xs font-medium
            text-blue-700 dark:text-blue-200
          "
          >
            {label}
          </span>
        </div>
      </div>

      {/* tooltip */}
      {tooltip.visible && (
        <div
          className="
          fixed z-100
          -translate-x-1/2 -translate-y-full
          rounded-md px-2 py-1
          text-xs text-white
          bg-black/90
          pointer-events-none
          whitespace-nowrap
        "
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {label}
        </div>
      )}
    </>
  );
};