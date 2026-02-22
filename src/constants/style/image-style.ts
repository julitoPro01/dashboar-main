const s = "relative aspect-square overflow-hidden"
export const IMAGE_STYLE = {
  preview: `w-32 sm:w-36 md:w-40 lg:w-64 ${s}`,
  thumb: `w-28 sm:w-32 md:w-36 lg:w-40 ${s}`,
  compact: `w-28 ${s}`,
  list:`w-16 ${s}`,
  image: "object-cover",
  img:"w-full h-full object-cover",

  size_preview:"(max-width: 768px) 160px, 256px",
  size_thumb:"160px",
  size_compact:"112px",
  size_list:"64px"

};
