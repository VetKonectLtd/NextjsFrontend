import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (from: string, to: string) => void;
  isLoading: boolean;
}

export const DateSelectionModal: React.FC<DateSelectionModalProps> = ({ isOpen, onClose, onDownload, isLoading }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
        alert("Please select both dates");
        return;
    }
    // Pass dates as YYYY-MM-DD (default input value format)
    onDownload(fromDate, toDate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-900">Download Case Report</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
            Note: This report includes cases based on their <strong>Date Occurred</strong>.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
             <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
            />
          </div>

          <div className="pt-2">
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#0B6614] hover:bg-green-800 text-white font-bold py-3 rounded-xl transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {isLoading ? "Downloading..." : "Download Excel Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
