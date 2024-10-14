import React from 'react';
import { FaBath, FaBed, FaBuilding, FaDollarSign, FaMapMarkerAlt, FaRegCheckCircle, FaRuler } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { useFetchProperties } from '../../hooks/properties.hooks';

export default function PropertiesDetails({ closeModal }) {
  const [searchParams] = useSearchParams();
  const resource_id = searchParams.get('resource_id');

  const { properties } = useFetchProperties();

  const property = properties?.paginate?.find((property) => property.id === +resource_id);
  if (!property) {
    return <div className='p-14 bg-white'>Property not found</div>;
  }

  return (
    <div className='max-w-6xl relative mx-auto p-6 bg-white rounded-lg shadow-md'>
      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 text-3xl transition-all duration-200 absolute top-6 text-gray-500 right-[1.9rem]'
      >
        <HiXMark />
      </button>
      {/* Property Title */}
      <h2 className='text-3xl font-bold text-primary mb-6'>{property.title}</h2>

      {/* Property Images */}
      <div className='mb-6'>
        <div className='grid grid-cols-2 gap-6 justify-between'>
          {property.imageUrl.map((image, index) => {
            return (
              <img key={index} className='w-full h-auto rounded-lg' src={image} alt={`Property Image ${index + 1}`} />
            );
          })}
        </div>
      </div>

      {/* Property Details */}
      <div className='mb-6' dangerouslySetInnerHTML={{ __html: property.details }}></div>

      {/* Combined Columns for Price, Type, Size, Specifications, and Appliances */}
      <div className='grid grid-cols-3 gap-6 mb-6'>
        {/* Price, Type, Size */}
        <div className='text-secondary flex flex-col gap-3'>
          <p className='items-center flex gap-1'>
            <FaDollarSign className='mr-2 text-primary' /> {property.price}
          </p>
          <p className='flex items-center'>
            <FaBuilding className='mr-2 text-primary' />
            {property.property_type}
          </p>
          <p className='flex items-center'>
            <FaRuler className='mr-2 text-primary' />
            {property.property_size} sqft
          </p>
        </div>

        {/* Specifications */}
        <div className='text-secondary flex flex-col gap-3'>
          <p className='flex items-center'>
            <FaBed className='mr-2 text-primary' />
            {property.bedrooms}
          </p>
          <p className='flex items-center'>
            <FaBath className='mr-2 text-primary' />
            {property.bathrooms}
          </p>
          <p className='flex items-center'>
            <FaMapMarkerAlt className='mr-2 text-primary' />
            <div className='flex items-center'>{property.location}</div>
          </p>
        </div>

        {/* Appliances */}
        <div className='text-secondary flex flex-col gap-3'>
          <strong>Appliances: </strong>
          <ul className='list-disc list-inside'>
            {property.appliances.map((appliance, index) => (
              <li key={index}>{appliance}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Property Features in Table Format */}
      <div className='mb-6'>
        <h3 className='text-xl font-semibold text-primary-light mb-4'>Features</h3>
        <table className='min-w-full bg-white table-auto border-collapse border border-gray-300'>
          <tbody>
            <tr className='border-t border-gray-300'>
              <td className='px-4 py-2 text-secondary'>Parking</td>
              <td className='px-4 py-2'>
                {property.hasParking ? <FaRegCheckCircle className='text-green-500' /> : 'No'}
              </td>
            </tr>
            <tr className='border-t border-gray-300'>
              <td className='px-4 py-2 text-secondary'>For Sale</td>
              <td className='px-4 py-2'>
                {property.isForSale ? <FaRegCheckCircle className='text-green-500' /> : 'No'}
              </td>
            </tr>
            <tr className='border-t border-gray-300'>
              <td className='px-4 py-2 text-secondary'>For Rent</td>
              <td className='px-4 py-2'>
                {property.isForRent ? <FaRegCheckCircle className='text-green-500' /> : 'No'}
              </td>
            </tr>
            <tr className='border-t border-gray-300'>
              <td className='px-4 py-2 text-secondary'>Land</td>
              <td className='px-4 py-2'>{property.isLand ? <FaRegCheckCircle className='text-green-500' /> : 'No'}</td>
            </tr>
            <tr className='border-t border-gray-300'>
              <td className='px-4 py-2 text-secondary'>Sold</td>
              <td className='px-4 py-2'>{property.isSold ? <FaRegCheckCircle className='text-green-500' /> : 'No'}</td>
            </tr>
            <tr className='border-t border-gray-300'>
              <td className='px-4 py-2 text-secondary'>Pool</td>
              <td className='px-4 py-2'>{property.hasPool ? <FaRegCheckCircle className='text-green-500' /> : 'No'}</td>
            </tr>
            <tr className='border-t border-gray-300'>
              <td className='px-4 py-2 text-secondary'>AC</td>
              <td className='px-4 py-2'>{property.AC ? <FaRegCheckCircle className='text-green-500' /> : 'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Year Built and YouTube URL */}
      <div className='mb-6'>
        <p className='text-secondary'>
          <strong>Year Built:</strong> {new Date(property.yearBuilt).getFullYear()}
        </p>
        {property.YTUrl && (
          <p className='text-secondary'>
            <strong>Video Tour:</strong>{' '}
            <a className='text-primary hover:underline' href={property.YTUrl} target='_blank' rel='noopener noreferrer'>
              Watch on YouTube
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
