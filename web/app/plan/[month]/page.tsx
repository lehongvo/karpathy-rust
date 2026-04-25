import { PLAN } from "@/lib/plan-data";
import { notFound } from "next/navigation";
import { MonthDetail } from "./MonthDetail";

export function generateStaticParams() {
  return PLAN.map((m) => ({ month: String(m.index) }));
}

export default async function MonthPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const idx = Number(month);
  const plan = PLAN.find((m) => m.index === idx);
  if (!plan) notFound();
  return <MonthDetail month={plan} />;
}
