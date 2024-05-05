import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

import AddUser from "../Admin/AddUser"
import AddItem from "../Items/AddItem"
import AddLaundry from "../Laundries/AddLaundry"
import AddPublicArea from "../PublicAreas/AddPublicArea"
import AddIssue from "../Issues/AddIssue"

interface NavbarProps {
  type: string
}

const Navbar = ({ type }: NavbarProps) => {
  const addUserModal = useDisclosure()
  const addItemModal = useDisclosure()
  const addLaundryModal = useDisclosure()
  const addPublicAreaModal = useDisclosure()
  const addIssueModal = useDisclosure()

  return (
    <>
      <Flex py={8} gap={4}>
        {/* TODO: Complete search functionality */}
        {/* <InputGroup w={{ base: '100%', md: 'auto' }}>
                    <InputLeftElement pointerEvents='none'>
                        <Icon as={FaSearch} color='gray.400' />
                    </InputLeftElement>
                    <Input type='text' placeholder='Search' fontSize={{ base: 'sm', md: 'inherit' }} borderRadius='8px' />
                </InputGroup> */}
        <Button
          variant="primary"
          gap={1}
          fontSize={{ base: "sm", md: "inherit" }}
          onClick={type === "User" ? addUserModal.onOpen 
          : type === "Item" ? addItemModal.onOpen 
          : type == "PublicArea" ? addPublicAreaModal.onOpen
          : type == "Issue" ? addIssueModal.onOpen
          : addLaundryModal.onOpen}
        >
          <Icon as={FaPlus} /> Добавить
        </Button>
        <AddUser isOpen={addUserModal.isOpen} onClose={addUserModal.onClose} />
        <AddItem isOpen={addItemModal.isOpen} onClose={addItemModal.onClose} />
        <AddLaundry isOpen={addLaundryModal.isOpen} onClose={addLaundryModal.onClose} />
        <AddPublicArea isOpen={addPublicAreaModal.isOpen} onClose={addPublicAreaModal.onClose} />
        <AddIssue isOpen={addIssueModal.isOpen} onClose={addIssueModal.onClose} />
      </Flex>
    </>
  )
}

export default Navbar
