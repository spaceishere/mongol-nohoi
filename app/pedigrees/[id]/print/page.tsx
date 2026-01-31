"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getPedigree } from "@/lib/store";
import type { Pedigree } from "@/types/pedigree";
import PedigreePreview from "@/components/PedigreePreview";

export default function PrintPage() {
  const params = useParams();
  const id = useMemo(() => {
    const v = (params as { id?: string | string[] }).id;
    return Array.isArray(v) ? v[0] : v ?? "";
  }, [params]);

  const [item, setItem] = useState<Pedigree | null>(null);

  useEffect(() => {
    if (!id) return;
    const x = getPedigree(id);
    setItem(x);
    const t = setTimeout(() => window.print(), 300);
    return () => clearTimeout(t);
  }, [id]);

  if (!id) return <div style={{ padding: 20 }}>ID алга байна.</div>;
  if (!item) return <div style={{ padding: 20 }}>Олдсонгүй.</div>;

  return (
    <div className="printRoot">
      <PedigreePreview data={item} mode="print" />
    </div>
  );
}
