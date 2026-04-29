'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Database,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { toast } from 'sonner';

type TableKey = string;

interface TableMeta {
  label: string;
  group: string;
}

interface ImportResult {
  created: number;
  skipped: number;
}

interface ImportResults {
  results: Record<TableKey, ImportResult>;
  errors: string[];
}

interface BackupData {
  exportedAt: string;
  version: string;
  tables: TableKey[];
  data: Record<TableKey, unknown[]>;
}

// ─── Checkbox Group Component ────────────────────────────────────────────────
const TableGroup = ({
  group,
  tables,
  selected,
  onToggle,
}: {
  group: string;
  tables: [TableKey, TableMeta][];
  selected: Set<TableKey>;
  onToggle: (key: TableKey) => void;
}) => {
  const [open, setOpen] = useState(true);
  const allChecked = tables.every(([k]) => selected.has(k));
  const someChecked = tables.some(([k]) => selected.has(k));

  const toggleAll = () => {
    if (allChecked) tables.forEach(([k]) => onToggle(k));
    else tables.filter(([k]) => !selected.has(k)).forEach(([k]) => onToggle(k));
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allChecked}
            ref={(el) => { if (el) el.indeterminate = someChecked && !allChecked; }}
            onChange={toggleAll}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Select all in ${group}`}
            className="w-4 h-4 accent-[#2d4a8f]"
          />
          <span className="font-medium text-sm text-gray-800">{group}</span>
          <span className="text-xs text-gray-400">
            {tables.filter(([k]) => selected.has(k)).length}/{tables.length}
          </span>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </div>
      {open && (
        <div className="divide-y">
          {tables.map(([key, meta]) => (
            <label
              key={key}
              className="flex items-center gap-3 px-6 py-2.5 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.has(key)}
                onChange={() => onToggle(key)}
                aria-label={meta.label}
                className="w-4 h-4 accent-[#2d4a8f]"
              />
              <span className="text-sm text-gray-700">{meta.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DataBackupPage() {
  const [tableMeta, setTableMeta] = useState<Record<TableKey, TableMeta>>({});
  const [exportSelected, setExportSelected] = useState<Set<TableKey>>(new Set());
  const [importSelected, setImportSelected] = useState<Set<TableKey>>(new Set());
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<ImportResults | null>(null);
  const [backupFile, setBackupFile] = useState<BackupData | null>(null);
  const [backupFileName, setBackupFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.get('/data-backup/tables').then((res) => {
      const meta = res.data.data as Record<TableKey, TableMeta>;
      setTableMeta(meta);
      setExportSelected(new Set(Object.keys(meta)));
    });
  }, []);

  const groups = Object.entries(tableMeta).reduce<Record<string, [TableKey, TableMeta][]>>(
    (acc, [key, meta]) => {
      if (!acc[meta.group]) acc[meta.group] = [];
      acc[meta.group].push([key, meta]);
      return acc;
    },
    {},
  );

  const toggleExport = (key: TableKey) => {
    setExportSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleImport = (key: TableKey) => {
    setImportSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const selectAllExport = () => setExportSelected(new Set(Object.keys(tableMeta)));
  const clearAllExport = () => setExportSelected(new Set());
  const selectAllImport = () => setImportSelected(new Set(backupFile?.tables ?? []));
  const clearAllImport = () => setImportSelected(new Set());

  const handleExport = async () => {
    if (!exportSelected.size) return toast.error('Please select at least one table');
    setIsExporting(true);
    try {
      const response = await api.post(
        '/data-backup/export',
        { tables: Array.from(exportSelected) },
        { responseType: 'blob', timeout: 60000 },
      );
      const url = URL.createObjectURL(new Blob([response.data], { type: 'application/json' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${exportSelected.size} table(s) successfully`);
    } catch {
      toast.error('Failed to export backup');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) {
      toast.error('Please select a valid .json backup file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as BackupData;
        if (!parsed.data || !parsed.version) {
          toast.error('Invalid backup file format');
          return;
        }
        setBackupFile(parsed);
        setBackupFileName(file.name);
        setImportSelected(new Set(parsed.tables ?? []));
        setImportResults(null);
        toast.success(`Backup loaded — ${parsed.tables?.length ?? 0} table(s) found`);
      } catch {
        toast.error('Failed to parse backup file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleImport = async () => {
    if (!backupFile) return;
    if (!importSelected.size) return toast.error('Please select at least one table to restore');
    setIsImporting(true);
    setImportResults(null);
    try {
      const payload: BackupData = {
        ...backupFile,
        tables: Array.from(importSelected) as TableKey[],
        data: Object.fromEntries(
          Array.from(importSelected).map((k) => [k, backupFile.data?.[k] ?? []]),
        ),
      };
      const response = await api.post('/data-backup/import', payload, { timeout: 120000 });
      setImportResults(response.data as ImportResults);
      toast.success('Restore completed');
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message ?? 'Failed to restore backup');
    } finally {
      setIsImporting(false);
    }
  };

  const totalImported = importResults
    ? Object.values(importResults.results).reduce((s, v) => s + v.created, 0)
    : 0;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#2d4a8f]/10 rounded-lg flex items-center justify-center">
          <Database size={20} className="text-[#2d4a8f]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Backup & Restore</h1>
          <p className="text-sm text-gray-500">Select tables to export or restore</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ── EXPORT PANEL ── */}
        <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download size={18} className="text-[#2d4a8f]" />
              <h2 className="text-lg font-semibold">Export Backup</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={selectAllExport} className="text-xs text-[#2d4a8f] hover:underline">All</button>
              <span className="text-gray-300">|</span>
              <button onClick={clearAllExport} className="text-xs text-gray-400 hover:underline">None</button>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            {Object.entries(groups).map(([group, tables]) => (
              <TableGroup
                key={group}
                group={group}
                tables={tables}
                selected={exportSelected}
                onToggle={toggleExport}
              />
            ))}
          </div>

          <Button
            onClick={handleExport}
            disabled={isExporting || !exportSelected.size}
            className="w-full bg-[#2d4a8f] hover:bg-[#243a73]"
          >
            <Download size={16} className="mr-2" />
            {isExporting ? 'Exporting...' : `Export ${exportSelected.size} Table(s)`}
          </Button>
        </div>

        {/* ── IMPORT PANEL ── */}
        <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Upload size={18} className="text-[#2d4a8f]" />
            <h2 className="text-lg font-semibold">Restore Backup</h2>
          </div>

          {/* File picker */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-[#2d4a8f] hover:bg-blue-50/30 transition-colors"
          >
            {backupFile ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <CheckCircle size={15} />
                  {backupFileName}
                </div>
                <p className="text-xs text-gray-400">
                  Exported: {new Date(backupFile.exportedAt).toLocaleString()} · {backupFile.tables?.length ?? 0} tables
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Click to select backup .json file</p>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept=".json" aria-label="Select backup JSON file" className="hidden" onChange={handleFileSelect} />

          {/* Table selector — only shows tables present in backup */}
          {backupFile && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Select tables to restore:</p>
                <div className="flex gap-2">
                  <button onClick={selectAllImport} className="text-xs text-[#2d4a8f] hover:underline">All</button>
                  <span className="text-gray-300">|</span>
                  <button onClick={clearAllImport} className="text-xs text-gray-400 hover:underline">None</button>
                </div>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {Object.entries(groups)
                  .map(([group, tables]) => {
                    const filtered = tables.filter(([k]) => backupFile.tables?.includes(k));
                    if (!filtered.length) return null;
                    return (
                      <TableGroup
                        key={group}
                        group={group}
                        tables={filtered}
                        selected={importSelected}
                        onToggle={toggleImport}
                      />
                    );
                  })}
              </div>
            </>
          )}

          <Button
            onClick={handleImport}
            disabled={!backupFile || !importSelected.size || isImporting}
            variant="outline"
            className="w-full border-[#2d4a8f] text-[#2d4a8f] hover:bg-[#2d4a8f] hover:text-white"
          >
            <Upload size={16} className="mr-2" />
            {isImporting ? 'Restoring...' : `Restore ${importSelected.size} Table(s)`}
          </Button>
        </div>
      </div>

      {/* ── RESULTS ── */}
      {importResults && (
        <div className="mt-6 bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Restore Results</h3>
            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              {totalImported} records imported
            </span>
          </div>
          <div className="divide-y">
            {Object.entries(importResults.results).map(([key, result]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-700">
                  {tableMeta[key]?.label ?? key}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle size={13} /> {result.created} imported
                  </span>
                  {result.skipped > 0 && (
                    <span className="flex items-center gap-1 text-sm text-yellow-600">
                      <AlertCircle size={13} /> {result.skipped} skipped
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {importResults.errors.length > 0 && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={16} className="text-red-500" />
                <span className="text-sm font-medium text-red-700">
                  {importResults.errors.length} errors
                </span>
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {importResults.errors.map((err, i) => (
                  <p key={i} className="text-xs text-red-600">{err}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
