import { useState } from 'react';

const TextExtender = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Conditionally render the full or truncated text
  const displayText = isExpanded ? text : text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');

  return (
    <div className='text-gray-700'>
      <p>
        {displayText}{' '}
        {text.length > maxLength && (
          <button className='text-blue-500 inline-block hover:underline focus:outline-none' onClick={toggleExpand}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>
    </div>
  );
};

export default TextExtender;
