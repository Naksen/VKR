import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiTrash } from "react-icons/fi"

import type { ItemOut, UserOut, LaundryOut, PublicAreaOut } from "../../client"
import EditUser from "../Admin/EditUser"
import EditItem from "../Items/EditItem"
import ReserveLaundry from "../Laundries/ReserveLaundry"
import ReservePublicArea from "../PublicAreas/ReservePublicArea"
import Delete from "./DeleteAlert"

interface ActionsMenuProps {
  type: string
  value: ItemOut | UserOut | LaundryOut | PublicAreaOut
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {
  const editUserModal = useDisclosure()
  const reserveLaundryModal = useDisclosure()
  const deleteModal = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
        <MenuList>
          <MenuItem
            onClick={editUserModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Изменить
          </MenuItem>
          <MenuItem
            onClick={deleteModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Удалить
          </MenuItem>
          <MenuItem
            onClick={reserveLaundryModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Забронировать
          </MenuItem>
        </MenuList>
        {type === "User" ? (
          <EditUser
            user={value as UserOut}
            isOpen={editUserModal.isOpen}
            onClose={editUserModal.onClose}
          />
        ) : type == "Item" ?(
          <EditItem
            item={value as ItemOut}
            isOpen={editUserModal.isOpen}
            onClose={editUserModal.onClose}
          />
        ) : type == "Laundry" ? (
          <ReserveLaundry
            laundry={value as LaundryOut}
            isOpen={reserveLaundryModal.isOpen}
            onClose={reserveLaundryModal.onClose}
          />
        ) : (
          <ReservePublicArea
            public_area={value as PublicAreaOut}
            isOpen={reserveLaundryModal.isOpen}
            onClose={reserveLaundryModal.onClose}
          />
        )}
        <Delete
          type={type}
          id={value.id}
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />
      </Menu>
    </>
  )
}

export default ActionsMenu
