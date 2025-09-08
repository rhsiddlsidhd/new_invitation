import { GalleryMapClient } from "@/types";

export const parseInvitationForm = (data: FormData) => {
  const textField: Record<string, string> = {};
  const thumbnailField: File[] = [];
  const galleryField: GalleryMapClient = new Map();

  for (const [keys, value] of data.entries()) {
    if (value instanceof File) {
      if (keys === "thumbnail") {
        thumbnailField.push(value);
      } else {
        const typeMatch = keys.match(/^gallery-([a-zA-Z0-9-]+?)(-type)?$/);
        if (!typeMatch) continue;

        const id = typeMatch && typeMatch[1];
        if (!galleryField.has(id))
          galleryField.set(id, { type: "A", images: [] });

        const gallery = galleryField.get(id);

        gallery?.images.push(value);
      }
    } else {
      const typeMatch = keys.match(/^gallery-([a-zA-Z0-9-]+?)(-type)?$/);
      if (!typeMatch) {
        textField[keys] = value;
        continue;
      }
      const id = typeMatch && typeMatch[1];
      const isType = Boolean(typeMatch && typeMatch[2]);

      if (!galleryField.has(id))
        galleryField.set(id, { type: "A", images: [] });

      const gallery = galleryField.get(id);

      if (isType && gallery) {
        gallery.type = value as "A" | "B" | "C" | "D" | "E";
      }
    }
  }

  return { textField, thumbnailField, galleryField };
};
