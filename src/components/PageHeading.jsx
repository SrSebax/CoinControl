export default function PageHeading({ title }) {
  return (
    <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 mb-8 tracking-tight">
      {title}
    </h2>
  );
}
