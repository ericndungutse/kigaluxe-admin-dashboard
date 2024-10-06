import logo from '../assets/logo.png';

function Logo() {
  return (
    <div className='text-center'>
      <img src={logo} alt='Logo' className='h-14 w-auto' />
    </div>
  );
}

export default Logo;
