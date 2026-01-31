"use client";

import Link from "next/link";
import PedigreeForm from "@/components/PedigreeForm";

export default function NewPedigreePage() {
  return (
    <div className="container">
      <div className="topbar">
        <h1>Шинэ удмын бичиг</h1>
        <Link className="btn" href="/">
          Буцах
        </Link>
      </div>
      <PedigreeForm />
    </div>
  );
}
