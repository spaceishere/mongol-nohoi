"use client";

import { useEffect, useMemo, useState } from "react";
import type { Pedigree } from "@/types/pedigree";
import { savePedigree } from "@/lib/store";
import PedigreePreview from "@/components/PedigreePreview";
import { useRouter } from "next/navigation";

function emptyPedigree(id?: string): Pedigree {
  const now = new Date().toISOString();
  return {
    id: id ?? crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    regNo: "",
    microchip: "",
    dogName: "",
    breed: "",
    sex: "",
    dob: "",
    color: "",
    breederStation: "",
    ownerName: "",
    ownerAddress: "",
    phone: "",
    lineage: Array.from({ length: 14 }, () => ""),
  };
}

export default function PedigreeForm({ initial }: { initial?: Pedigree | null }) {
  const router = useRouter();
  const [data, setData] = useState<Pedigree>(() => initial ?? emptyPedigree());

  useEffect(() => {
    if (initial) setData(initial);
  }, [initial]);

  const canSave = useMemo(() => data.dogName.trim().length > 0, [data.dogName]);

  const onChange = (k: keyof Pedigree, v: string) => {
    setData((p) => ({ ...p, [k]: v }));
  };

  const onLineage = (idx: number, v: string) => {
    setData((p) => {
      const next = p.lineage.slice();
      next[idx] = v;
      return { ...p, lineage: next };
    });
  };

  const onSave = () => {
    if (!canSave) return;
    const saved = savePedigree({
      ...data,
      regNo: data.regNo.trim(),
      microchip: data.microchip.trim(),
      dogName: data.dogName.trim(),
    });
    router.push(`/pedigrees/${saved.id}`);
  };

  const onPrint = () => {
    if (!canSave) return;
    const saved = savePedigree({
      ...data,
      regNo: data.regNo.trim(),
      microchip: data.microchip.trim(),
      dogName: data.dogName.trim(),
    });
    router.push(`/pedigrees/${saved.id}/print`);
  };

  return (
    <div className="grid">
      <div className="panel">
        <div className="row">
          <div className="field">
            <div className="label">Бүртгэлийн №</div>
            <input value={data.regNo} onChange={(e) => onChange("regNo", e.target.value)} />
          </div>
          <div className="field">
            <div className="label">Microchip</div>
            <input value={data.microchip} onChange={(e) => onChange("microchip", e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <div className="label">Нохойн нэр</div>
            <input value={data.dogName} onChange={(e) => onChange("dogName", e.target.value)} />
          </div>
          <div className="field">
            <div className="label">Үүлдэр</div>
            <input value={data.breed} onChange={(e) => onChange("breed", e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <div className="label">Хүйс</div>
            <input value={data.sex} onChange={(e) => onChange("sex", e.target.value)} />
          </div>
          <div className="field">
            <div className="label">Төрсөн огноо</div>
            <input value={data.dob} onChange={(e) => onChange("dob", e.target.value)} placeholder="YYYY-MM-DD" />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <div className="label">Зүс</div>
            <input value={data.color} onChange={(e) => onChange("color", e.target.value)} />
          </div>
          <div className="field">
            <div className="label">Үржлийн газар</div>
            <input value={data.breederStation} onChange={(e) => onChange("breederStation", e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <div className="label">Эзэмшигч</div>
            <input value={data.ownerName} onChange={(e) => onChange("ownerName", e.target.value)} />
          </div>
          <div className="field">
            <div className="label">Хаяг</div>
            <input value={data.ownerAddress} onChange={(e) => onChange("ownerAddress", e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <div className="label">Утас</div>
            <input value={data.phone} onChange={(e) => onChange("phone", e.target.value)} />
          </div>
        </div>

        <div className="divider" />

        <div className="lineage">
          {Array.from({ length: 14 }).map((_, i) => (
            <div className="field" key={i}>
              <div className="label">Удам {i + 1}</div>
              <input value={data.lineage[i] ?? ""} onChange={(e) => onLineage(i, e.target.value)} />
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="btn" disabled={!canSave} onClick={onSave}>
            Хадгалах
          </button>
          <button className="btn primary" disabled={!canSave} onClick={onPrint}>
            Хэвлэх
          </button>
        </div>

        {!canSave && <div className="hint">Хамгийн багадаа “Нохойн нэр” бөглөнө.</div>}
      </div>

      <div className="previewWrap">
        <div className="previewFrame">
          <PedigreePreview data={data} mode="screen" />
        </div>
      </div>
    </div>
  );
}
