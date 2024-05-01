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

import { type ApiError, IssuesService } from "../../client"
// import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/issues")({
component: Issues,
})


function Issues() {
    const showToast = useCustomToast()
    const {
      data: issues,
      isLoading,
      isError,
      error,
    } = useQuery("public_areas", () => IssuesService.readIssues({}))
  
    if (isError) {
      const errDetail = (error as ApiError).body?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
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
              >
                Issues Management
              </Heading>
              <Navbar type={"Issue"} />
              <TableContainer>
                <Table size={{ base: "sm", md: "md" }}>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Issue type</Th>
                      <Th>Status</Th>
                      <Th>Location</Th>
                      <Th>Desctiprion</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {issues.data.map((issue) => (
                      <Tr key={issue.id}>
                        <Td>{issue.id}</Td>
                        <Td>{issue.issue_type}</Td>
                        <Td>{issue.status}</Td>
                        <Td>{issue.location}</Td>
                        <Td>{issue.description}</Td>
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
  
export default Issues
  