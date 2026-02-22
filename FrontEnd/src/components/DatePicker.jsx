export default function DatePicker({ date, onChange }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">Pilih Tanggal</h4>
      <input
        type="date"
        value={date}
        onChange={e => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-black"
      />
    </div>
  );
}