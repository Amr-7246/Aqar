'use client'
import { useGetEntity } from '@/APIs'
import { IArtisan } from '@/types/artisan/artisan'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import React, { useState } from 'react'
import Loader2 from '../Loader_2';
import ErrorMessage from '@/components/ErrorMessage';

const containerStyle = {
  width: "100%",
  height: "90vh",
  borderRadius: "1rem",
};

const center = { lat: 30.0444, lng: 31.2357 }; // Default center → Cairo

const Map = () => {
  const {data: allArtisans, isPending: artisanDataLoading, isError: artisanDataError} = useGetEntity<IArtisan[]>('artisan')
  const { isLoaded: isMapLoaded, loadError: isMapError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selected, setSelected] = useState<IArtisan | null>(null);
  return (
    <div className="flex flex-col items-center w-full py-10 border-t border-black ">
      <h1 className="text-2xl font-bold text-blue-500 mb-4"> We Are Everywhere About You</h1>
      <div className={'rounded-2xl overflow-hidden w-[80%] min-h-[200px] mx-auto '}>
        {
          artisanDataLoading ? <Loader2/> :
          // artisanDataLoading || isMapLoaded ? <Loader2/> :
          isMapError || artisanDataError ? <ErrorMessage/> :
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
          >
            {allArtisans?.map((a) => (
              <Marker
                key={a.id}
                position={{ lat: a.latitude, lng: a.longitude }}
                title={a.name}
                onClick={() => setSelected(a)}
              />
            ))}

            {selected && (
              <InfoWindow
                position={{ lat: selected.latitude, lng: selected.longitude }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="text-sm text-gray-700 space-y-1">
                  <h3 className="font-bold text-blue-600">{selected.name}</h3>
                  <p className="text-gray-500">{selected.specialization}</p>
                  <p> {selected.address}</p>
                  <p> {selected.phone}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

        }
      </div>

    </div>
  )
}

export default Map
