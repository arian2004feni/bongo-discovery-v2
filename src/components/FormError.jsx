export default function FormError({ error }) {
  if (!error) return null;

  return (
    <p className="text-sm text-red-500 mt-1">
      {error.message || "Invalid input"}
    </p>
  );
}
