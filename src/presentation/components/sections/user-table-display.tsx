/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch } from "rizzui/switch";
import { User, UserType } from "../../../lib/types";
import { displayUserBike, displayUserType } from "../../../utils/functions";
import { Badge } from "rizzui/badge";
import { updateUser } from "../../../services/users";
import { Select } from "rizzui/select";

export default function UserTableDisplay({ user, onUpdate }: { user: User, onUpdate: (u: User) => void }) {
  const updateType = async (t: UserType) => {
    onUpdate({ ...user, type: t })
    await updateUser(user.id, { type: t })
  }

  const updateActiveState = async (v: boolean) => {
    onUpdate({ ...user, active: v })
    await updateUser(user.id, { active: v })
  }

  return (
    <tr className="bg-white border-b border-gray-200">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {user.name ?? '---'}
      </th>
      <td className="px-6 py-4">
        {
          user.email ?? '---'
        }
      </td>
      <td className="px-6 py-4">
        {
          user.phone ?? '---'
        }
      </td>
      <td className="px-6 py-4">
        <Select
          options={[
            {
              value: UserType.driver,
              label: "Motard"
            },
            {
              value: UserType.passenger,
              label: "Client"
            },
          ]}
          value={{ value: user.type, label: displayUserType(user.type) }}
          onChange={e => {
            updateType((e as any).value)
          }}
          className={'w-[100px]'}
        />
      </td>
      <td className="px-6 py-4">
        {
          user.province?.name ?? '---'
        }
      </td>
      <td className="px-6 py-4">
        {
          displayUserBike(user.bike)
        }
      </td>
      <td className="px-6 py-4">
        <Switch
          checked={user.active}
          onChange={(e) => updateActiveState(e.target.checked)}
        />
      </td>
      <td className="px-6 py-4">
        <Badge
          color={user.online == null ? 'success' : user.online ? 'success' : 'danger'}
        >
          {user.online ? 'Oui' : 'Non'}
        </Badge>
      </td>
    </tr>
  )
}