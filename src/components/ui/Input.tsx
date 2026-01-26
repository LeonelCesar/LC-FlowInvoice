interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const Input = ({ label, ...props }: InputProps) => (
  <div className="flex flex-col mb-4">
    <label className="mb-1 text-sm font-medium">{label}</label>
    <input
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);


