import { SkeletonLoader } from '../../ui/SkeletonLoader.jsx';
import { MainButton } from '../../ui/buttons/MainButton';
import { Bath, MapPin, BedDouble, CarFront, Trees, PawPrint, LandPlot, Droplet, Wifi, Zap, Tv, } from 'lucide-react';

export function PropertyPricingDetails({ propertyTemp, isLoading }) {
    const property = propertyTemp;

    const showPricingDetails = (property) => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col border-2 gap-2 rounded-md p-4">
                    <h3>Pricing details</h3>
                    {/* este if verifica el tipo de propiedad */}
                    {property.property_transaction === "Sale" ? (
                        <div className='flex justify-between'>
                            <p>Sale Payment</p>
                            <p className="font-medium">{property.currency_code} {property.price}</p>
                        </div>
                    ) : property.property_transaction === "Rent" ? (
                        <div>
                            <div className="flex justify-between">
                                <p>Rental Price</p>
                                <p className="font-medium">{property.currency_code} {property.rent_price} {property.payment_frequency}</p>
                            </div>
                            {property.deposit_price && property.deposit_price > 0 ? (
                                <div className="flex justify-between">
                                    <p>Security Deposit</p>
                                    <p className="font-medium">{property.currency_code} {property.deposit_price}</p>
                                </div>
                            ) : (
                                <p className="font-medium">No security deposit available</p>
                            )}
                        </div>
                    ) : property.property_transaction === "Dual" ? (
                        <div>

                            <div className="flex justify-between">
                                <p>Sale Payment</p>
                                <p className="font-medium">{property.currency_code} {property.price}</p>
                            </div>
                            <div className="border border-b-1 m-2"></div>
                            <div className="flex justify-between mt-2">
                                <p>Rental Price</p>
                                <p className="font-medium">{property.currency_code} {property.rent_price} {property.payment_frequency}</p>
                            </div>
                            {property.deposit_price && property.deposit_price > 0 ? (
                                <div className="flex justify-between">
                                    <p>Security Deposit</p>
                                    <p className="font-medium">{property.currency_code} {property.deposit_price}</p>
                                </div>
                            ) : (
                                <p className="font-medium">No security deposit available</p>
                            )}
                        </div>
                    ) : (
                        <p className="font-medium">Transaction type not available</p>
                    )}

                    <MainButton
                        text="Scheduled a visit"
                        variant="border"
                        customClass="mt-4"
                        type="button"
                    />
                    <MainButton text="Get Property" type="button" />
                </div>

                <div className="flex flex-col border-2 gap-2 rounded-md p-4">
                    
                    <h3>Utilities</h3>
                    <div className='flex justify-center gap-4'>
                        {property.utilities && property.utilities.length > 0 ? (
                            property.utilities.map((utility) => {
                                switch (utility.name) {
                                    case 'Water':
                                        return (
                                            <div key={utility.id} className="utility-box water">
                                                <Droplet />
                                                <p>Water </p>
                                            </div>
                                        );
                                    case 'Wifi':
                                        return (
                                            <div key={utility.id} className="utility-box wifi">
                                                <Wifi />
                                                <p>Wifi </p>
                                            </div>
                                        );
                                    case 'Electricity Access':
                                        return (
                                            <div key={utility.id} className="utility-box electricity">
                                                <Zap />
                                                <p>Electricity </p>
                                            </div>
                                        );
                                    case 'Cable':
                                        return (
                                            <div key={utility.id} className="utility-box cable">
                                                <Tv />
                                                <p>Furnished</p>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })
                        ) : (
                            <p>No utilities available</p>
                        )}
                    </div>
                </div>
            </div>
        )
    };
    const showLoader = () => {
        return (
            <div className="flex flex-col gap-4">
                <SkeletonLoader customClass="h-64 w-full" />
            </div>
        );
    }

    return (
        <div>
            {isLoading
                ? showLoader()
                : showPricingDetails(property)}
        </div>
    );
}