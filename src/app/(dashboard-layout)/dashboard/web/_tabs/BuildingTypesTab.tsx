"use client";

import { useState, useEffect, useRef } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  ToggleLeft,
  ToggleRight,
  GripVertical,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  buildingTypeService,
  BuildingType,
  BuildingTypeField,
} from "@/services/building-type.service";
import { showToast } from "@/lib/toast";

const FIELD_TYPES = ["text", "number", "email", "tel", "textarea"];

const emptyField = (): Omit<BuildingTypeField, "id"> => ({
  label: "",
  fieldType: "text",
  placeholder: "",
  isRequired: false,
  displayOrder: 0,
});

const emptyForm = () => ({
  name: "",
  price: 0,
  isActive: true,
  displayOrder: 0,
  fields: [] as (Partial<BuildingTypeField> & { _tempId?: string })[],
});

function SortableRow({
  bt,
  expandedId,
  setExpandedId,
  deleteConfirmId,
  setDeleteConfirmId,
  handleEdit,
  handleToggleActive,
  handleDelete,
}: {
  bt: BuildingType;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  deleteConfirmId: string | null;
  setDeleteConfirmId: (id: string | null) => void;
  handleEdit: (bt: BuildingType) => void;
  handleToggleActive: (bt: BuildingType) => void;
  handleDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: bt.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-white flex-wrap">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Status toggle */}
        <button
          onClick={() => handleToggleActive(bt)}
          title={bt.isActive ? "Active — click to deactivate" : "Inactive — click to activate"}
          className="shrink-0"
        >
          {bt.isActive ? (
            <ToggleRight className="w-6 h-6 text-green-500" />
          ) : (
            <ToggleLeft className="w-6 h-6 text-gray-400" />
          )}
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900 text-sm">{bt.name}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                bt.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {bt.isActive ? "Active" : "Inactive"}
            </span>
            {Number(bt.price) > 0 && (
              <span className="text-xs text-gray-500">${Number(bt.price).toLocaleString()}</span>
            )}
            <span className="text-xs text-gray-400">Order: {bt.displayOrder}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {bt.fields.length} dynamic field{bt.fields.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {bt.fields.length > 0 && (
            <button
              onClick={() => setExpandedId(expandedId === bt.id ? null : bt.id)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle fields"
            >
              {expandedId === bt.id ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}
          <button
            onClick={() => handleEdit(bt)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteConfirmId(bt.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete confirm inline */}
      {deleteConfirmId === bt.id && (
        <div className="px-4 py-3 bg-red-50 border-t border-red-100 flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-red-700 font-medium">Delete "{bt.name}"? This cannot be undone.</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(bt.id)}
              className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-1.5 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Expanded fields */}
      {expandedId === bt.id && bt.fields.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Dynamic Fields</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {bt.fields
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((f) => (
                <div key={f.id} className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-gray-800">{f.label}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                        {f.fieldType}
                      </span>
                      {f.isRequired && (
                        <span className="text-xs bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-medium">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                  {f.placeholder && (
                    <p className="text-xs text-gray-400 mt-0.5">Placeholder: {f.placeholder}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BuildingTypesTab() {
  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const lastFieldRef = useRef<HTMLDivElement>(null);

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const res = await buildingTypeService.getAll();
      const sorted = (res.data.data || []).sort((a, b) => a.displayOrder - b.displayOrder);
      setBuildingTypes(sorted);
    } catch {
      showToast.error("Failed to load building types.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (bt: BuildingType) => {
    setEditingId(bt.id);
    setForm({
      name: bt.name,
      price: Number(bt.price),
      isActive: bt.isActive,
      displayOrder: bt.displayOrder,
      fields: bt.fields.map((f) => ({ ...f, _tempId: f.id })),
    });
    setShowForm(true);
    setExpandedId(null);
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      showToast.error("Name is required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        price: form.price,
        isActive: form.isActive,
        displayOrder: form.displayOrder,
        fields: form.fields.map((f, i) => ({
          ...(f.id ? { id: f.id } : {}),
          label: f.label || "",
          fieldType: f.fieldType || "text",
          placeholder: f.placeholder || "",
          isRequired: f.isRequired ?? false,
          displayOrder: f.displayOrder ?? i,
        })),
      };
      if (editingId) {
        await buildingTypeService.update(editingId, payload);
        showToast.success("Building type updated successfully.");
      } else {
        await buildingTypeService.create(payload);
        showToast.success("Building type created successfully.");
      }
      await fetchAll();
      resetForm();
    } catch (e: any) {
      showToast.error(e?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (bt: BuildingType) => {
    try {
      await buildingTypeService.update(bt.id, { isActive: !bt.isActive });
      await fetchAll();
      showToast.success(
        `"${bt.name}" ${!bt.isActive ? "activated" : "deactivated"}.`,
      );
    } catch {
      showToast.error("Failed to update status.");
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = buildingTypes.findIndex((bt) => bt.id === active.id);
    const newIndex = buildingTypes.findIndex((bt) => bt.id === over.id);
    const reordered = arrayMove(buildingTypes, oldIndex, newIndex).map(
      (bt, i) => ({ ...bt, displayOrder: i }),
    );
    setBuildingTypes(reordered);

    try {
      await buildingTypeService.reorder({
        items: reordered.map((bt) => ({ id: bt.id, displayOrder: bt.displayOrder })),
      });
    } catch {
      showToast.error("Failed to save order.");
      await fetchAll();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await buildingTypeService.delete(id);
      await fetchAll();
      setDeleteConfirmId(null);
      showToast.success("Building type deleted.");
    } catch (e: any) {
      showToast.error(e?.response?.data?.message || "Failed to delete.");
    }
  };

  // Field helpers
  const addField = () => {
    setForm((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          ...emptyField(),
          _tempId: `new-${Date.now()}`,
          displayOrder: prev.fields.length,
        },
      ],
    }));
    setTimeout(() => {
      lastFieldRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const updateField = (idx: number, key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f, i) =>
        i === idx ? { ...f, [key]: value } : f,
      ),
    }));
  };

  const removeField = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== idx),
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Building Types
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              {buildingTypes.length} type(s) — shown as dropdown on estimator
              preview
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#243a73] transition-colors text-sm font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Building Type
            </button>
          )}
        </div>

        {/* Create / Edit Form */}
        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-5">
              {editingId ? "Edit Building Type" : "New Building Type"}
            </h3>

            {/* Basic fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., Single Family"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price ($)
                </label>
                <input
                  type="number"
                  min={0}
                  title="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  min={0}
                  title="Display Order"
                  value={form.displayOrder}
                  onChange={(e) =>
                    setForm({ ...form, displayOrder: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="w-4 h-4 text-[#2d4a8f] border-gray-300 rounded focus:ring-[#2d4a8f]"
                />
                <span className="text-sm font-medium text-gray-700">
                  Active (visible in estimator)
                </span>
              </label>
            </div>

            {/* Dynamic Fields */}
            <div className="mb-5">
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-800">
                  Dynamic Fields
                </h4>
              </div>

              {form.fields.length === 0 && (
                <p className="text-sm text-gray-400 italic mb-3">
                  No dynamic fields yet. Click "+ Add Field" below to add input
                  fields for this building type.
                </p>
              )}

              <div className="space-y-3">
                {form.fields.map((field, idx) => {
                  const isLast = idx === form.fields.length - 1;
                  return (
                    <div
                      key={field._tempId || field.id || idx}
                      ref={isLast ? lastFieldRef : null}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Label *
                          </label>
                          <input
                            type="text"
                            value={field.label || ""}
                            onChange={(e) =>
                              updateField(idx, "label", e.target.value)
                            }
                            placeholder="e.g., Number of Units"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Field Type
                          </label>
                          <select
                            title="Field Type"
                            value={field.fieldType || "text"}
                            onChange={(e) =>
                              updateField(idx, "fieldType", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] focus:border-transparent"
                          >
                            {FIELD_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Display Order
                          </label>
                          <input
                            type="number"
                            min={0}
                            title="Field Display Order"
                            value={field.displayOrder ?? idx}
                            onChange={(e) =>
                              updateField(
                                idx,
                                "displayOrder",
                                Number(e.target.value),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Placeholder
                          </label>
                          <input
                            type="text"
                            value={field.placeholder || ""}
                            onChange={(e) =>
                              updateField(idx, "placeholder", e.target.value)
                            }
                            placeholder="e.g., Enter number of units"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.isRequired ?? false}
                              onChange={(e) =>
                                updateField(idx, "isRequired", e.target.checked)
                              }
                              className="w-4 h-4 text-[#2d4a8f] border-gray-300 rounded"
                            />
                            <span className="text-xs font-medium text-gray-600">
                              Required
                            </span>
                          </label>
                          <button
                            onClick={() => removeField(idx)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            aria-label="Remove field"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Field button — always at the bottom */}
              <button
                onClick={addField}
                className="mt-3 flex items-center gap-2 w-full px-4 py-2.5 border-2 border-dashed border-[#2d4a8f]/30 text-[#2d4a8f] rounded-lg hover:border-[#2d4a8f] hover:bg-blue-50 transition-all text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Field
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#243a73] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium shadow-sm"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingId
                    ? "Update Building Type"
                    : "Create Building Type"}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="p-6">
          {buildingTypes.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-base font-medium mb-1">
                No building types yet
              </p>
              <p className="text-sm">
                Click "Add Building Type" to create one.
              </p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={buildingTypes.map((bt) => bt.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {buildingTypes.map((bt) => (
                    <SortableRow
                      key={bt.id}
                      bt={bt}
                      expandedId={expandedId}
                      setExpandedId={setExpandedId}
                      deleteConfirmId={deleteConfirmId}
                      setDeleteConfirmId={setDeleteConfirmId}
                      handleEdit={handleEdit}
                      handleToggleActive={handleToggleActive}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}
