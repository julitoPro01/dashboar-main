import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLES } from "./recordStatus.constans";
import { type RecordStatusDb } from "./type";

type TextSize = | "xxs" | "xs" | "sm" | "lg";
const TEXT_SIZE: Record<TextSize, string> = {
  xxs: "text-[10px]",
  xs: "text-xs",
  sm: "text-sm",
  lg: "text-lg"
} as const;

type Props = {
  status: RecordStatusDb;
  style?: {
    border?: false;
    bullet?: false;
    bg?: false;
    textSize?: TextSize
  }
};

export const RecordStatusBadge = ({ status, style }: Props) => {
  const label = RECORD_STATUS_LABEL[status];

  const { txt, bg, border, isBullet, txtSize, bg1 } = buildStyle({ status, style });

  return (
    <span className={`${txtSize} inline-flex items-center gap-2 font-semibold  px-2.5 py-0.5 rounded-md
    ${txt} ${bg} ${border}`}>
      {isBullet &&
        <span className={`w-1.25 h-1.25 rounded-full ${bg1}`} />
      }
      {label}
    </span>
  );
};

const buildStyle = ({ status, style }: Props) => {
  const color = RECORD_STATUS_STYLES[status];

  const rest = {
    border: "border " + color.colorBor300,
    bg: color.colorBg50,
    bg1: color.colorBg400,
    txt: color.colorTxt500,
    txtSize: "text-xs",
    isBullet: true
  }

  if (style) {
    const { border, bullet, bg, textSize } = style;
    (border === false) && (rest.border = "");
    (bullet === false) && (rest.isBullet = false);
    (bg === false) && (rest.bg = "");
    (textSize) && (rest.txtSize = TEXT_SIZE[textSize])
  }

  return rest;
}