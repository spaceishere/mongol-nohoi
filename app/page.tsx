"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Pedigree } from "@/types/pedigree";
import { exportAll, importAll, listPedigrees, removePedigree } from "@/lib/store";

export default function HomePage() {
  const [items, setItems] = useState<Pedigree[]>([]);
  const [json, setJson] = useState("");

  const refresh = () => setItems(listPedigrees());

  useEffect(() => {
    refresh();
  }, []);

  const onDelete = (id: string) => {
    removePedigree(id);
    refresh();
  };

  const onExport = () => {
    setJson(exportAll());
  };

  const onImport = () => {
    importAll(json);
    refresh();
  };

  return (
    <div className="container">
      <div className="topbar">
        <h1>Удмын бичиг</h1>
        <Link className="btn primary" href="/pedigrees/new">
          Шинэ үүсгэх
        </Link>
      </div>

      <div className="card">
        <div className="row">
          <button className="btn" onClick={onExport}>
            Export (JSON)
          </button>
          <button className="btn" onClick={onImport} disabled={!json.trim()}>
            Import (JSON)
          </button>
        </div>
        <textarea
          className="textarea"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder="Энд export хийсэн JSON-оо хуулж хадгалах/эсвэл өөр төхөөрөмжөөс import хийх боломжтой."
        />
      </div>

      <div className="card">
        {items.length === 0 ? (
          <div className="empty">Одоогоор хадгалсан бичиг алга байна.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Нохойн нэр</th>
                <th>Огноо</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id}>
                  <td>
                    <Link href={`/pedigrees/${x.id}`}>{x.dogName || "(нэргүй)"}</Link>
                  </td>
                  <td>{new Date(x.createdAt).toLocaleString()}</td>
                  <td className="right">
                    <Link className="btn" href={`/pedigrees/${x.id}/print`}>
                      Хэвлэх
                    </Link>
                    <button className="btn danger" onClick={() => onDelete(x.id)}>
                      Устгах
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
