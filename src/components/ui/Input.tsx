interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const Input = ({ label, ...props }: InputProps) => (
  <div className="flex flex-col mb-4">
    <label className="mb-1 text-sm font-medium text-gray-500">{label}</label>
    <input
      className="border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500"
      {...props}
    />
  </div>
);


