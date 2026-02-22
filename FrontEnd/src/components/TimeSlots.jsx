export default function TimeSlots({ slots, selectedTime, onSelect }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">Jam Tersedia</h4>

      {slots.length === 0 && (
        <p className="text-red-500">Semua slot penuh</p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {slots.map(slot => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`
              py-2 rounded-lg border text-sm transition
              ${
                selectedTime === slot
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }
            `}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}