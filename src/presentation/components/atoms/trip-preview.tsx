import { Badge } from "rizzui/badge";
import { Trip } from "../../../lib/types";
import { FaLocationArrow } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";

export default function TripPreview({ trip }: { trip: Trip }) {
  const isInProgress = !trip.canceled && !trip.timeStamps.end && !trip.ended
  const isCanceled = trip.canceled

  return (
    <div className="w-full border rounded-md p-3 flex flex-col gap-3">
      <div className="w-full flex items-center gap-5">
        <Badge className="w-fit" color={isInProgress ? 'success' : isCanceled ? 'danger' : 'primary'}>
          {
            isInProgress ? 'En cours' : isCanceled ? 'Annulée' : 'Terminée'
          }
        </Badge>
        {
          (trip.cash || trip.transaction) && (
            <p className="w-fit px-2 py-1 text-sm rounded-md text-white bg-c-primary">
              {trip.cash?.amount.toLocaleString('fr') ?? trip.transaction?.amount.toLocaleString('fr')} {trip.cash?.currency.value ?? trip.transaction?.wallet.currency.value}
            </p>
          )
        }
      </div>
      <div className="w-full flex flex-col">
        <p>
          <span className="font-bold">Client(e): </span> <span>{trip.user.name}</span>
        </p>
        <p>
          <span className="font-bold">Motard: </span> <span>{trip.driver?.name ?? '---'}</span>
        </p>
        <div className="w-full flex items-start mt-2 gap-2">
          <FaLocationArrow className="shrink-0 text-red-500" />
          <span>
            {trip.locations.from.name}
          </span>
        </div>
        <div className="w-full flex items-center gap-2">
          <GiPathDistance />
          <span>
            {trip.locations.distance} KM
          </span>
        </div>
        <div className="w-full flex items-start mt-2 gap-2">
          <FaLocationArrow className="shrink-0 text-red-500" />
          <span>
            {trip.locations.to.name}
          </span>
        </div>
      </div>
    </div>
  )
}