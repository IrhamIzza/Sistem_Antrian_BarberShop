export default function AdminDatePicker({ date, onChange }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <label className="font-semibold block mb-2">
        Pilih Tanggal
      </label>
      <input
        type="date"
        value={date}
        onChange={e => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 w-60"
      />
    </div>
  );
}