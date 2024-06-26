import {
  Container,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "react-query"

import { type ApiError, LaundriesService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/laundries")({
  component: Laundries,
})


function Laundries() {
  const showToast = useCustomToast()
  const {
    data: laundries,
    isLoading,
    isError,
    error,
  } = useQuery("laundries", () => LaundriesService.readLaundries({}))

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Что-то пошло не так.", `${errDetail}`, "error")
  }

  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        laundries && (
          <Container maxW="full">
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              Прачечные
            </Heading>
            <Navbar type={"Laundry"} />
            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Комната</Th>
                    <Th>Номер стиральной машины</Th>
                    <Th>Действия</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {laundries.data.map((laundry) => (
                    <Tr key={laundry.id}>
                      <Td>{laundry.id}</Td>
                      <Td>{laundry.room}</Td>
                      <Td>{laundry.washing_machine_number}</Td>
                      <Td>
                        <ActionsMenu type={"Laundry"} value={laundry} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        )
      )}
    </>
  )
}

export default Laundries
