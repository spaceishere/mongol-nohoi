"use client";

import type { Pedigree } from "@/types/pedigree";

function T(props: { text: string; x: number; y: number; w?: number; size?: number }) {
  const { text, x, y, w = 280, size = 12 } = props;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        fontSize: size,
        lineHeight: `${size + 2}px`,
        color: "#111",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </div>
  );
}

export default function PedigreePreview({ data }: { data: Pedigree }) {
  const lineage = data.lineage?.length === 14 ? data.lineage : Array.from({ length: 14 }, () => "");

  const W = 1536;
  const H = 1024;

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <img src="/templates/pedigree.png" alt="template" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      <T text={data.regNo} x={860} y={78} w={230} />
      <T text={data.microchip} x={860} y={150} w={230} />

      <T text={data.dogName} x={130} y={220} w={340} />
      <T text={data.breed} x={110} y={250} w={230} />
      <T text={data.sex} x={260} y={250} w={120} />
      <T text={data.dob} x={420} y={250} w={160} />
      <T text={data.color} x={610} y={250} w={160} />
      <T text={data.breederStation} x={780} y={250} w={310} />

      <T text={data.ownerName} x={540} y={315} w={260} />
      <T text={data.ownerAddress} x={820} y={315} w={270} />
      <T text={data.phone} x={540} y={345} w={260} />

      <T text={lineage[0]} x={165} y={380} w={260} />
      <T text={lineage[1]} x={165} y={440} w={260} />

      <T text={lineage[2]} x={420} y={378} w={240} />
      <T text={lineage[3]} x={420} y={428} w={240} />
      <T text={lineage[4]} x={420} y={480} w={240} />
      <T text={lineage[5]} x={420} y={530} w={240} />

      <T text={lineage[6]} x={690} y={378} w={240} />
      <T text={lineage[7]} x={690} y={418} w={240} />
      <T text={lineage[8]} x={690} y={458} w={240} />
      <T text={lineage[9]} x={690} y={498} w={240} />
      <T text={lineage[10]} x={690} y={538} w={240} />
      <T text={lineage[11]} x={690} y={578} w={240} />
      <T text={lineage[12]} x={690} y={620} w={240} />
      <T text={lineage[13]} x={690} y={660} w={240} />
    </div>
  );
}
