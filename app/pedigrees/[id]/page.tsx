"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getPedigree } from "@/lib/store";
import type { Pedigree } from "@/types/pedigree";
import PedigreeForm from "@/components/PedigreeForm";

export default function PedigreeEditPage() {
  const params = useParams();
  const id = useMemo(() => {
    const v = (params as { id?: string | string[] }).id;
    return Array.isArray(v) ? v[0] : v ?? "";
  }, [params]);

  const [item, setItem] = useState<Pedigree | null>(null);

  useEffect(() => {
    if (!id) return;
    setItem(getPedigree(id));
  }, [id]);

  return (
    <div className="container">
      <div className="topbar">
        <h1>Засварлах</h1>
        <div className="row">
          <Link className="btn" href="/">
            Жагсаалт
          </Link>
          {id && (
            <Link className="btn primary" href={`/pedigrees/${id}/print`}>
              Хэвлэх
            </Link>
          )}
        </div>
      </div>

      {item ? <PedigreeForm initial={item} /> : <div className="card">Олдсонгүй.</div>}
    </div>
  );
}
