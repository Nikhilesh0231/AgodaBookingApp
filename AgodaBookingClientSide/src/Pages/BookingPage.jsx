import React, { useEffect, useState } from 'react'
import AccountNav from "../AccountNav";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';
import BookingDates from '../BookingDates';

export default function BookingPage() {
  const [booking,setBooking] =useState(null);
  const {id} = useParams();
  useEffect(()=>{
    if(id){
      axios.get('/bookings').then(response => {
        const foundBookings = response.data.find(({_id})=>_id === id);
        if(foundBookings){
          setBooking(foundBookings);
        }
      });
    }
  },[id]);

  if(!booking){
    return <div>Loading...</div>;
  }
  return (
    <div className='my-8'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 mb-4 rounded-2xl my-6 flex justify-between">
        <div>
          <h2 className='text-2xl mb-4'>Your booking information</h2>
          <BookingDates booking={booking}/>
        </div>
        <div className='bg-primary text-white rounded-2xl p-6 items-center'>
          <div className=''>Total price</div>
          <div className='text-3xl'>${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}/>
    </div>
  )
}
