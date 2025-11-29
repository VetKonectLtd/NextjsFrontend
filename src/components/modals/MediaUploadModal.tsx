"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { ImageIcon, Loader2, Trash2 } from "lucide-react";
import { useMediaService, buildImagesFormData } from "@/services/mediaService";

interface MediaUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const MediaUploadModal = ({
  open,
  onClose,
  onSuccess,
}: MediaUploadModalProps) => {
  const { useUploadMedia } = useMediaService();
  const uploadMutation = useUploadMedia();
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const previews = useMemo(
    () =>
      files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  const onPickFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const filtered = selected.filter((f) => ACCEPTED_TYPES.includes(f.type));
    setFiles((prev) => [...prev, ...filtered]);
    // reset input so same file selection works again
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selected = Array.from(e.dataTransfer.files || []);
    const filtered = selected.filter((f) => ACCEPTED_TYPES.includes(f.type));
    setFiles((prev) => [...prev, ...filtered]);
  }, []);

  const onRemove = useCallback((name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }, []);

  const onUpload = useCallback(() => {
    if (!files.length) return;
    const fd = buildImagesFormData(files);
    uploadMutation.mutate(fd, {
      onSuccess: () => {
        setFiles([]);
        onClose();
        onSuccess?.();
      },
    });
  }, [files, uploadMutation, onClose, onSuccess]);

  const disabled = uploadMutation.isLoading || files.length === 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <div className="text-center">
            <DialogTitle className="font-extrabold text-2xl">
              Upload Media
            </DialogTitle>
            <DialogDescription>
              Add one or more images (JPEG/PNG). Max few at a time.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="border-2 border-dashed rounded-lg p-6 text-center hover:border-gray-300 transition"
        >
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <ImageIcon className="w-8 h-8" />
            <p className="text-sm">Drag & drop images here</p>
            <p className="text-xs">or</p>
            <div>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                multiple
                onChange={onPickFiles}
                className="hidden"
                id="media-upload-input"
              />
              <label
                htmlFor="media-upload-input"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm cursor-pointer hover:bg-gray-50"
              >
                Choose files
              </label>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {previews.map((p) => (
              <div key={p.name} className="relative group">
                <Image
                  src={p.url}
                  alt={p.name}
                  width={200}
                  height={200}
                  className="w-full h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => onRemove(p.name)}
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1 border"
                  aria-label="Remove"
                >
                  <Trash2 className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <Button
            type="button"
            onClick={onUpload}
            disabled={disabled}
            className="flex-1 py-5"
          >
            {uploadMutation.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadModal;
