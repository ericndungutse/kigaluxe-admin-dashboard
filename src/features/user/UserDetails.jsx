import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import useFetchLocations from '../../hooks/locations.hooks';

export default function LocationDetails({ closeModal }) {
  const [searchParams] = useSearchParams();
  const location_id = searchParams.get('resource_id');

  // Current locations
  const { locations } = useFetchLocations(false);

  const location = locations?.paginate?.find((location) => location.id === +location_id);

  if (!location) {
    return <div className='p-14 bg-white'>Location not found</div>;
  }

  return (
    <div className='max-w-6xl relative mx-auto p-6 bg-white rounded-lg shadow-md'>
      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 text-3xl transition-all duration-200 absolute top-6 text-gray-500 right-[1.9rem]'
      >
        <HiXMark />
      </button>
      {/* Location Title */}
      <h2 className='text-3xl font-bold text-primary mb-6'>{location.knownName}</h2>

      {/* Location Image */}
      <div className='mb-6'>
        <img className='w-full h-auto rounded-lg' src={location.url} alt={`Location Image`} />
      </div>

      {/* Location Details */}
      <div className='mb-6 text-secondary'>
        <p className='flex items-center'>
          <FaMapMarkerAlt className='mr-2 text-primary' /> {location.province}, {location.district}, {location.sector}
        </p>
        <p className='mt-3'>{location.description}</p>
      </div>

      {/* Properties associated with Location */}
      {location.properties && location.properties.length > 0 && (
        <div className='mb-6'>
          <h3 className='text-xl font-semibold text-primary-light mb-4'>Properties in this Location</h3>
          <ul className='list-disc list-inside'>
            {location.properties.map((property) => (
              <li key={property.id}>
                {property.title} - {property.property_type}, {property.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Created and Updated Dates */}
      <div className='mb-6'>
        <p className='text-secondary'>
          <strong>Created At:</strong> {new Date(location.createdAt).toLocaleDateString()}
        </p>
        <p className='text-secondary'>
          <strong>Updated At:</strong> {new Date(location.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
