interface FloatingInputProps {
    label: string
    type: string
    name: string
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FloatingInput: React.FC<FloatingInputProps> = ({
    label,
    type,
    name,
    onChangeHandler
}) => {
  return (
    <div className="relative z-0 w-full mb-3">
      <input
        type={type}
        placeholder=" "
        name={name}
        onChange={e => { if (onChangeHandler) onChangeHandler(e)}}
        className="pt-3 pl-1 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-black"
      />
      <label
        className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
