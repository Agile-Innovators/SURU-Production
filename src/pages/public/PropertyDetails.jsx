
import { AdvancedCard } from '../../components/ui/cards/AdvancedCard';
import { Bath, MapPin, BedDouble, CarFront, Trees, PawPrint, LandPlot, Droplet, Wifi, Zap, Tv, } from 'lucide-react';
import { ROUTE_PATHS } from '../../routes';
import { useAxios } from '../../components/hooks/useAxios.js';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { BackButton } from '../../components/ui/buttons/BackButton';
import { useState, useEffect } from 'react';
import { GlobalProvider } from '../../global/GlobalProvider.jsx';
import { useFetchPropertyDetails } from "../../components/hooks/useFetchPropertyDetails.js";
import { ImageCarrusel } from '../../components/activity/property_details_components/PropertyFeatures.jsx';
import { PropertyFeatures } from '../../components/activity/property_details_components/Utilities.jsx';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader.jsx';
import { PropertyPricingDetails } from '../../components/activity/property_details_components/PropertyPricingDetails.jsx';
export function PropertyDetails() {
    const { propertyDetails, isLoadingPropsDetails } = useFetchPropertyDetails();
    console.log(propertyDetails);
    // se obtiene la propiedad de la respuesta de la API y se asigna a la constante property
    const { property = {} } = propertyDetails || {};

    const showLoaderCards = () => {
        return Array(1)
            .fill(0)
            .map((_, index) => (
                <SkeletonLoader
                    key={`card-${index}`}
                    customClass="h-[27rem] w-full"
                />
                
            ));
    };

    const showGeneralInformaction = (property) => {
        return(
            <div className="flex flex-col gap-2">
            {/* Inicio Detalles Generales */}
            <h2>{property.title}</h2>
            <div className="flex">
                <MapPin />
                <h4 className='font-medium text-md'>{property.city}, {property.region}</h4>
            </div>
            <p>
                {property.description}
            </p>
            {/* Fin Detalles Generales */}
            {/* Inicio Features*/}
            <PropertyFeatures property={property} />
            {/* Fin Features*/}
            <div className="flex flex-col gap-1 mt-5">
                <h3>Property Details</h3>
                <p><b>Availability Date:</b>  {property.availability_date}.</p>
                <p><b>Property Category:</b> {property.property_category}</p>
                {/* <p><b>Specific Direction:</b> 175 meters north of Tierra Mia Restaurant, near Arenal Volcano National Park.</p> */}
            </div>
        </div>
        )
    }; 

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-4 my-4">
            <BackButton />
            {/* Carrusel */}
            <ImageCarrusel propertyTemp={property} isLoading={isLoadingPropsDetails} />
            {/* Fin Carrusel */}



            <div className="grid grid-cols-[1fr] sm:grid-cols-[2fr_1fr] gap-4 mt-6">
                {/* Detalles Generales */}
                {isLoadingPropsDetails ? showLoaderCards() : showGeneralInformaction(property)}
                {/* Fin Detalles Generales */}

                {/* Detalles de Precios */}


                <PropertyPricingDetails propertyTemp={property} isLoading={isLoadingPropsDetails} />

            </div>

            <div className="flex gap-4 justify-between w-fit border-2 rounded-lg p-4 mt-10">
                <div className="w-[10rem] overflow-hidden rounded-lg">
                    <img
                        src="https://picsum.photos/id/77/450/300"
                        alt=""
                        className="w-full object-cover h-full"
                    />
                </div>
                <section>
                    <h6 className="text-lg font-semibold">Owner Information</h6>
                    <p className="text-gray-600">Karla Marín Arias</p>
                    <MainButton
                        type="button"
                        text="Contact"
                        variant="border"
                        customClass="px-2 py-1 text-sm mt-3"
                    />
                </section>
            </div>
            <div className="mt-10">
                <h2>Propeties availables in the same area</h2>

                <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 justify-center items-center mt-10">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <AdvancedCard
                            srcImage="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                            title="Woodie Comfy Property"
                            location="Santa Teresa, Puntarenas. CR."
                            price={100000}
                            frequency="monthly"
                            key={index}
                            customClass={'m-auto'}
                        >
                            <MainButton
                                text="View"
                                variant="border"
                                type="link"
                                to={ROUTE_PATHS.NOT_FOUND}
                            />
                        </AdvancedCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
