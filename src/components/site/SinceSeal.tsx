export function SinceSeal({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-brand bg-carbon text-center text-carbon-foreground " + className}>
      <span className="text-[.6rem] font-semibold uppercase tracking-[.25em] text-brand">Desde</span>
      <span className="font-display text-3xl font-bold leading-none">1964</span>
      <span className="mt-1.5 max-w-[7rem] text-[.5rem] uppercase tracking-[.2em] text-carbon-foreground/60">Usinagem industrial</span>
    </div>
  );
}
