import toast from "react-hot-toast"
import { ErrorNotificationIcon, SuccessNotificationIcon } from "../presentation/components/atoms/notification-icons"

export const notify = (message: string, type: 'error' | 'success' = 'success') => {
  toast(message, {
    icon: type === 'error' ? <ErrorNotificationIcon /> : <SuccessNotificationIcon />,
    position: 'top-center',
  })
}
