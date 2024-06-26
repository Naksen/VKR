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

import { type ApiError, type AreaEnum, PublicAreaService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/public_areas")({
component: PublicAreas,
})


function translateType(issueType?: AreaEnum | null): string {
  switch (issueType) {
      case 'sport':
          return 'Спортивная';
      case 'dancing':
          return 'Танцевальная';
      case 'gaming':
          return 'Игровая';
      case 'other':
          return 'Другая';
      default:
        return 'Неизвестный тип';
  }
}

function PublicAreas() {
    const showToast = useCustomToast()
    const {
      data: public_areas,
      isLoading,
      isError,
      error,
    } = useQuery("public_areas", () => PublicAreaService.readPublicAreas({}))
  
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
            public_areas && (
            <Container maxW="full">
              <Heading
                size="lg"
                textAlign={{ base: "center", md: "left" }}
                pt={12}
              >
                Общественные зоны
              </Heading>
              <Navbar type={"PublicArea"} />
              <TableContainer>
                <Table size={{ base: "sm", md: "md" }}>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Название</Th>
                      <Th>Описание</Th>
                      <Th>Вместительность</Th>
                      <Th>Тип зоны</Th>
                      <Th>Действия</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {public_areas.data.map((public_area) => (
                      <Tr key={public_area.id}>
                        <Td>{public_area.id}</Td>
                        <Td>{public_area.name}</Td>
                        <Td>{public_area.description}</Td>
                        <Td>{public_area.capacity}</Td>
                        <Td>{translateType(public_area.area_type)}</Td>
                        <Td>
                        <ActionsMenu type={"PublicArea"} value={public_area} />
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
  
export default PublicAreas
  