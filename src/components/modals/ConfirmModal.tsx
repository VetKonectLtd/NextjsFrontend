"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  icon,
  isLoading = false,
}: ConfirmModalProps) => {
  const defaultIcon =
    variant === "destructive" ? (
      <AlertTriangle className="w-6 h-6 text-red-500" />
    ) : null;

  const displayIcon = icon !== undefined ? icon : defaultIcon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg">
        <DialogHeader>
          <div className="text-center px-4 m-auto">
            <div className="flex items-center justify-center mb-4">
              {displayIcon}
            </div>
            <DialogTitle className="font-extrabold text-xl text-gray-55 mb-2">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 text-center">
              {message}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6 px-4">
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full py-6 rounded-md text-white text-base font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700 disabled:bg-red-400"
                : "bg-primary-400 hover:bg-primary-600 disabled:bg-gray-400"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </Button>

          <Button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full py-3 text-gray-55 font-medium rounded-lg bg-[#FFDAB0] hover:bg-[#ffdab0ef] transition disabled:opacity-50"
          >
            {cancelText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
