export default function Loading({ loading }) {
  if (!loading) return null;
  return (
    <div className="bg-black fixed h-screen inset-0 z-50 flex items-center justify-center opacity-80">
      <i className="ph ph-circle-notch animate-spin text-9xl text-white"></i>
    </div>
  );
}