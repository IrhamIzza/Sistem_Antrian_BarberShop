export default function Loading({ loading }) {
  if (!loading) return null;
  return (
    <div className="fixed h-screen inset-0 z-50 flex items-center justify-center bg-black/80">
      <i className="ph ph-circle-notch animate-spin text-8xl text-white"></i>
    </div>
  );
}
