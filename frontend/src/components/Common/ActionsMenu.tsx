import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiTrash, FiClock } from "react-icons/fi"
import { GrStatusGood } from "react-icons/gr";
import { SlMagnifier } from "react-icons/sl";


import type { ItemOut, UserOut, LaundryOut, PublicAreaOut, IssueOut, LaundryScheduleOut, PublicAreaScheduleOut } from "../../client"
import EditUser from "../Admin/EditUser"
import ReserveLaundry from "../Laundries/ReserveLaundry"
import ReservePublicArea from "../PublicAreas/ReservePublicArea"
import ShowDetails from "../Technical/ShowDetails"
import ChangeStatus from "../Technical/ChangeStatus"
import Delete from "./DeleteAlert"
import EditLaundry from "../Laundries/EditLaundry";
import EditPublicArea from "../PublicAreas/EditPublicArea";
import EditIssue from "../Issues/EditIssue";

import useAuth from "../../hooks/useAuth"
interface ActionsMenuProps {
  type: string
  value: ItemOut | UserOut | LaundryOut | PublicAreaOut | IssueOut | LaundryScheduleOut | PublicAreaScheduleOut
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {
  const editUserModal = useDisclosure()
  const reserveLaundryModal = useDisclosure()
  const reservePublicAreaModal = useDisclosure()
  const deleteModal = useDisclosure()
  const showDetailsModal = useDisclosure()
  const changeStatusModal = useDisclosure()
  const editLaundryModal = useDisclosure()
  const editPublicAreaModal = useDisclosure()
  const editIssueModal = useDisclosure()
  const { user: currentUser } = useAuth()

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
          {type === "User" && (
            <>
              <MenuItem
                onClick={editUserModal.onOpen}
                icon={<FiEdit fontSize="16px" />}
              >
                Изменить
              </MenuItem>
              <MenuItem
                onClick={deleteModal.onOpen}
                icon={<FiTrash fontSize="16px" />}
                color="red.600"
              >
                Удалить
              </MenuItem>
            </>
          )}
          {type === "Laundry" && (
            <>
              <MenuItem
                onClick={reserveLaundryModal.onOpen}
                icon={<FiClock fontSize="16px" />}
              >
                Забронировать
              </MenuItem>
              {currentUser?.is_superuser && (
              <>
                <MenuItem
                  onClick={editLaundryModal.onOpen}
                  icon={<FiEdit fontSize="16px" />}
                >
                  Изменить
                </MenuItem>
                <MenuItem
                  onClick={deleteModal.onOpen}
                  icon={<FiTrash fontSize="16px" />}
                >
                  Удалить
                </MenuItem>
              </>
              )}
            </>
          )}
          {type === "PublicArea" && (
            <>
              <MenuItem
                onClick={reservePublicAreaModal.onOpen}
                icon={<FiClock fontSize="16px" />}
              >
                Забронировать
              </MenuItem>
              {currentUser?.is_superuser && (
              <>
                <MenuItem
                  onClick={editPublicAreaModal.onOpen}
                  icon={<FiEdit fontSize="16px" />}
                >
                  Изменить
                </MenuItem>
                <MenuItem
                  onClick={deleteModal.onOpen}
                  icon={<FiTrash fontSize="16px" />}
                >
                  Удалить
                </MenuItem>
              </>
              )}
            </>

          )}
          {type == "Issue" && (
            <>
              <MenuItem
                onClick={editIssueModal.onOpen}
                icon={<FiEdit fontSize="16px" />}
              >
                Изменить
              </MenuItem>
              <MenuItem
                onClick={deleteModal.onOpen}
                icon={<FiTrash fontSize="16px" />}
              >
                Удалить
              </MenuItem>
            </>
          )}
          {type == "LaundrySchedule" && (
            <>
              <MenuItem
                onClick={deleteModal.onOpen}
                icon={<FiTrash fontSize="16px" />}
              >
                Удалить
              </MenuItem>
            </>
          )}
          {type == "PublicAreaSchedule" && (
            <>
              <MenuItem
                onClick={deleteModal.onOpen}
                icon={<FiTrash fontSize="16px" />}
              >
                Удалить
              </MenuItem>
            </>
          )}
          {type === "Technical" && (
            <>
            <MenuItem
              onClick={showDetailsModal.onOpen}
              icon={<SlMagnifier fontSize="16px" />}
            >
              Показать детали
            </MenuItem>
            <MenuItem
              onClick={changeStatusModal.onOpen}
              icon={<GrStatusGood fontSize="16px" />}
            >
              Изменить статус
            </MenuItem>
            </>
          )}
        </MenuList>
        {type === "User" && (
          <EditUser
            user={value as UserOut}
            isOpen={editUserModal.isOpen}
            onClose={editUserModal.onClose}
          />
        )}
        {type === "Laundry" && (
          <>
            <ReserveLaundry
              laundry={value as LaundryOut}
              isOpen={reserveLaundryModal.isOpen}
              onClose={reserveLaundryModal.onClose}
            />
            <EditLaundry
              laundry={value as LaundryOut}
              isOpen={editLaundryModal.isOpen}
              onClose={editLaundryModal.onClose}
            />
          </>
        )}
        {type == "Issue" && (
          <EditIssue
            issue={value as IssueOut}
            isOpen={editIssueModal.isOpen}
            onClose={editIssueModal.onClose}
          />
        )
        }
        {type === "PublicArea" && (
          <>
            <ReservePublicArea
              public_area={value as PublicAreaOut}
              isOpen={reservePublicAreaModal.isOpen}
              onClose={reservePublicAreaModal.onClose}
            />
            <EditPublicArea
              public_area={value as PublicAreaOut}
              isOpen={editPublicAreaModal.isOpen}
              onClose={editPublicAreaModal.onClose}
            />
          </>
        )}
        {type === "Technical" && (
          <>
            <ShowDetails
              issue_id={value.id}
              isOpen={showDetailsModal.isOpen}
              onClose={showDetailsModal.onClose}
            />
            <ChangeStatus
              issue_id={value.id}
              isOpen={changeStatusModal.isOpen}
              onClose={changeStatusModal.onClose}
            />
          </>
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