import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"
import { FiHome, FiSettings, FiUsers, FiList } from "react-icons/fi"
import { useQueryClient } from "react-query"
import { MdLocalLaundryService } from "react-icons/md"
import { IoChatbox } from "react-icons/io5"

import type { UserOut } from "../../client"
import { GoReport } from "react-icons/go"

const items = [
  { icon: FiHome, title: "Главная", path: "/" },
  { icon: MdLocalLaundryService, title: "Прачечные", path: "/laundries" },
  { icon: FiList, title: "Общественные зоны", path: "/public_areas" },
  { icon: IoChatbox, title: "Запросы", path: "/issues" },
  // { icon: GoReport, title: "Управление запросами", path: "/technical"},
  { icon: FiSettings, title: "Настройки пользователя", path: "/settings" },
]

interface SidebarItemsProps {
  onClose?: () => void
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const queryClient = useQueryClient()
  const textColor = useColorModeValue("ui.main", "ui.white")
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568")
  const currentUser = queryClient.getQueryData<UserOut>("currentUser")

  // const finalItems = currentUser?.is_superuser
  //   ? [...items, { icon: FiUsers, title: "Админ", path: "/admin" }]
  //   : items
  
  const finalItems = [
    ...items,
    ...(currentUser?.is_technical_staff ? [{ icon: GoReport, title: "Управление запросами", path: "/technical" }] : []),
    ...(currentUser?.is_superuser ? [{ icon: FiUsers, title: "Админ", path: "/admin" }] : []),
  ];

  const listItems = finalItems.map((item) => (
    <Flex
      as={Link}
      to={item.path}
      w="100%"
      p={2}
      key={item.title}
      activeProps={{
        style: {
          background: bgActive,
          borderRadius: "12px",
        },
      }}
      color={textColor}
      onClick={onClose}
    >
      <Icon as={item.icon} alignSelf="center" />
      <Text ml={2}>{item.title}</Text>
    </Flex>
  ))

  return (
    <>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
