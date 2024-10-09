function Input({ register, type, placeholder, isDisabled, value }) {
  return (
    <input
      disabled={isDisabled}
      className='border rounded px-2 py-1 shadow-sm bg-white w-ful disabled:opacity-40'
      type={type}
      defaultValue={value}
      {...register}
      placeholder={placeholder}
    />
  );
}

export default Input;
