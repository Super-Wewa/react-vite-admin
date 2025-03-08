import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export function ErrorNotificationIcon() {
  return (
    <FaTimesCircle className="text-red-500" />
  )
}

export function SuccessNotificationIcon() {
  return (
    <FaCheckCircle className="text-green-500" />
  )
}
