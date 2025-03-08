import toast from "react-hot-toast"
import { ErrorNotificationIcon, SuccessNotificationIcon } from "../presentation/components/atoms/notification-icons"
import { Bike, UserType } from "../lib/types"

export const notify = (message: string, type: 'error' | 'success' = 'success') => {
  toast(message, {
    icon: type === 'error' ? <ErrorNotificationIcon /> : <SuccessNotificationIcon />,
    position: 'top-center',
  })
}

export const displayUserType = (type: UserType) => type == UserType.driver ? "Motard" : "Client"

export const displayUserBike = (bike?: Bike) => bike ? `${bike.model} ${bike.color} plaquée ${bike.plaque}` : '---'
