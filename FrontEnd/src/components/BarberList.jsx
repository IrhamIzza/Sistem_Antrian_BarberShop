export default function BarberList({ barbers, barberId, onSelect }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">Pilih Barber</h4>

      <div className="flex gap-2 flex-wrap">
        {barbers.map(barber => (
          <button
            key={barber.id}
            onClick={() => onSelect(barber.id)}
            className={`
              px-4 py-2 rounded-lg border transition
              ${
                barberId === barber.id
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }
            `}
          >
            {barber.name}
          </button>
        ))}
      </div>
    </div>
  );
}