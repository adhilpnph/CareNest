"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Column<T> = {
  render: (item: T) => React.ReactNode;
};

type CrudSectionProps<T extends { id: number }> = {
  title: string;
  items: T[] | undefined;
  isLoading: boolean;
  error: unknown;
  columns: Column<T>[];
  form: React.ReactNode;
  onSelect: (item: T) => void;
  onDelete: (id: number) => void;
  editingId: number | null;
};

export function CrudSection<T extends { id: number }>({
  title,
  items,
  isLoading,
  error,
  columns,
  form,
  onSelect,
  onDelete,
  editingId,
}: CrudSectionProps<T>) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center justify-between border-b border-[#f0eef2] py-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {items && <Badge variant="outline">{items.length}</Badge>}
      </CardHeader>
      <CardContent className="pt-4">
        {form}
        {isLoading && <p role="status" className="mt-3 text-xs text-[#96939e]">Loading...</p>}
        {error && <p role="alert" className="mt-3 text-sm text-[#b74b4b]">Request failed. Try again.</p>}
        <div className="mt-5">
          {items?.map((item) => (
            <div
              key={item.id}
              className={`group flex cursor-pointer items-center justify-between gap-3 border-t border-[#f0eef2] py-3 text-[12px] transition-colors hover:bg-[#faf9fc] ${editingId === item.id ? "bg-[#f8f6fc]" : ""}`}
              onClick={() => onSelect(item)}
            >
              <span className="min-w-0 truncate">
                {columns.map((col, i) => (
                  <span key={i} className="block">{col.render(item)}</span>
                ))}
              </span>
              <span className="flex shrink-0 gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onSelect(item); }}>
                  Update
                </Button>
                <Button type="button" variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>
                  Delete
                </Button>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
