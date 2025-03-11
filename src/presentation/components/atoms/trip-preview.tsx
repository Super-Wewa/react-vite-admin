import { MapPin, Clock, User, Bike, Star } from 'lucide-react';
import { Trip } from '../../../lib/types';

export default function TripPreview({ trip }: {trip: Trip}) {
  const getStatusColor = () => {
    if (trip.canceled) return 'bg-red-100 text-red-800';
    if (trip.ended) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = () => {
    if (trip.canceled) return 'Annulée';
    if (trip.ended) return 'Finie';
    return 'En cours';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">{trip.user.name}</h3>
          <p className="text-gray-600 flex items-center">
            <User className="w-4 h-4 mr-2" />
            {trip.user.phone}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1" />
          <div>
            <p className="text-sm text-gray-600">De</p>
            <p className="text-gray-800">{trip.locations.from.name}</p>
          </div>
        </div>
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1" />
          <div>
            <p className="text-sm text-gray-600">À</p>
            <p className="text-gray-800">{trip.locations.to.name}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <Clock className="w-4 h-4 text-gray-500 mr-2" />
        <span className="text-sm text-gray-600">
          {formatDate(trip.timeStamps.createdAt)}
        </span>
      </div>

      {trip.driver && (
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Motard</h4>
              <p className="text-gray-600">{trip.driver.name}</p>
              <p className="text-gray-600 text-sm">{trip.driver.phone}</p>
            </div>
            {trip.driver.bike && (
              <div className="flex items-center">
                <Bike className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  {trip.driver.bike.model} • {trip.driver.bike.color}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {trip.cash && (
        <div className="border-t pt-4 mt-4">
          <p className="text-lg font-semibold text-gray-800">
            {formatCurrency(trip.cash.amount, trip.cash.currency.value)}
          </p>
        </div>
      )}

      {(trip.passengerRate || trip.driverRate) && (
        <div className="border-t pt-4 mt-4 flex gap-4">
          {trip.passengerRate && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>Note du client: {trip.passengerRate}/5</span>
            </div>
          )}
          {trip.driverRate && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>Note du motard: {trip.driverRate}/5</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}