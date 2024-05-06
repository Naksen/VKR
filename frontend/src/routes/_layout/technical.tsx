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

import { type ApiError, type IIssueType, type IStatusEnum, TechnicalService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import useCustomToast from "../../hooks/useCustomToast"

function translateIssueType(issueType?: IIssueType): string {
  switch (issueType) {
      case 'plumbing':
          return 'Сантехника';
      case 'electrics':
          return 'Электрика';
      case 'heating':
          return 'Отопление';
      case 'furniture':
          return 'Мебель';
      case 'other':
          return 'Другое';
      default:
        return 'Неизвестный тип';
  }
}

function translateIssueStatus(issueType?: IStatusEnum): string {
  switch (issueType) {
      case 'new':
          return 'Новый';
      case 'in_progress':
          return 'Выполняется';
      case 'completed':
          return 'Завершен';
      case 'closed':
          return 'Закрыт';
      default:
        return 'Неизвестный тип';
  }
}

export const Route = createFileRoute("/_layout/technical")({
    component: Technical,
})

function Technical() {
    const showToast = useCustomToast()
    const {
      data: issues,
      isLoading,
      isError,
      error,
    } = useQuery("technical", () => TechnicalService.readTechnicalIssues({}))
  
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
            issues && (
            <Container maxW="full">
              <Heading
                size="lg"
                textAlign={{ base: "center", md: "left" }}
                pt={12}
                mb={12}
              >
                Запросы жильцов
              </Heading>
              <TableContainer>
                <Table size={{ base: "sm", md: "md" }}>
                  <Thead>
                    <Tr>
                      <Th>Полное имя</Th>
                      <Th>Почта</Th>
                      <Th>Тип</Th>
                      <Th>Статус</Th>
                      <Th>Действия</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {issues.data.map((issue) => (
                      <Tr key={issue.id}>
                        <Td>{issue.full_name}</Td>
                        <Td>{issue.email}</Td>
                        <Td>{translateIssueType(issue.issue_type)}</Td>
                        <Td>{translateIssueStatus(issue.status)}</Td>
                        <Td>
                            <ActionsMenu type={"Technical"} value={issue} />
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
  
export default Technical