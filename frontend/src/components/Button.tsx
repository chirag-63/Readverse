interface ButtonProps {
  label: string;
  disabled?:boolean,
  onClick?: ()=> void
  type?: 'purple' | 'green' | 'black';
}

export function Button({ label, disabled, onClick, type = 'purple' }: ButtonProps) {
  let buttonClass = '';

  switch (type) {
    case 'green':
      buttonClass = 'font-serif text-black w-full h-full bg-[#8DA348] hover:bg-[#6c8426] focus:outline-none focus:ring-2 focus:ring-gray-300 rounded select-none';
      break;
    case 'black':
      buttonClass = 'font-serif w-full h-full bg-[#2d2d2d] hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-gray-300 rounded select-none';
      break;
    case 'purple':
    default:
      buttonClass = 'font-serif w-full h-full bg-[#6A11CB] hover:bg-[#3e106f] focus:outline-none focus:ring-2 focus:ring-gray-300 rounded select-none';
      break;
  }

  if (disabled) {
    buttonClass += ' opacity-50 cursor-not-allowed pointer-events-none';
  }

  return (
    <button type="button" className={buttonClass} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
