import DropDownManue from '../DropDownManue';

export default function TableRow({ data, headers }) {
  const td = headers.map((header, index) => {
    const isImage = header.key === 'imageUrl';
    const isAction = header.key === 'action';
    const isBoolean = typeof data[header.key] === 'boolean';
    const rowContent = isAction ? (
      <DropDownManue />
    ) : isBoolean ? (
      data[header.key] ? (
        '❌'
      ) : (
        '✔'
      )
    ) : isImage ? (
      <div className='h-12 w-16'>
        <img src={data[header.key][1]} className='h-full w-auto' />
      </div>
    ) : (
      data[header.key]
    );

    return (
      <td
        key={index}
        className={`text-gray-500 p-0 py-2 ${index !== headers.length ? 'text-left' : 'text-right'} ${
          index + 1 === 1 ? 'font-medium' : ''
        } `}
      >
        {rowContent}
      </td>
    );
  });

  return <tr className='border-b'>{td}</tr>;
}
