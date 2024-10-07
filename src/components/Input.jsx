function Input({ register, type, placeholder, isDisabled }) {
  return (
    <input
      disabled={isDisabled}
      className='border rounded px-2 py-1 shadow-sm bg-white w-ful'
      type={type}
      {...register}
      placeholder={placeholder}
    />
  );
}

export default Input;
