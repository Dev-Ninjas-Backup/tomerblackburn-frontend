'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { parseCSV } from '@/lib/csv';

interface ImportExportButtonsProps {
  onExport: () => void;
  onImport: (rows: Record<string, string>[]) => void;
  isImporting?: boolean;
}

const ImportExportButtons = ({ onExport, onImport, isImporting }: ImportExportButtonsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const rows = parseCSV(text);
      onImport(rows);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onExport} className="flex items-center gap-1">
        <Download size={15} />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="flex items-center gap-1"
      >
        <Upload size={15} />
        {isImporting ? 'Importing...' : 'Import CSV'}
      </Button>
      <input ref={fileInputRef} type="file" accept=".csv" aria-label="Import CSV file" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default ImportExportButtons;
