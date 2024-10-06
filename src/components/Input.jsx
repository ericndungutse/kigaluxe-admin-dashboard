function Input({ register, otherProps }) {
  return <input className='border rounded px-2 py-1 shadow-sm bg-white' {...otherProps} {...register} />;
}

export default Input;
