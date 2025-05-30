export default function PageHeading({ title }) {
  return (
    <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[var(--color-primary)] mb-8 tracking-tight">
      {title}
    </h2>
  );
}
