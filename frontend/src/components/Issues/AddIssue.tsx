import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select
} from "@chakra-ui/react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type ApiError, type IssueCreate, IssuesService} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddIssueProps {
isOpen: boolean
onClose: () => void
}


const AddIssue = ({ isOpen, onClose }: AddIssueProps) => {
    const queryClient = useQueryClient()
    const showToast = useCustomToast()
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<IssueCreate>({
      mode: "onBlur",
      criteriaMode: "all",
      defaultValues: {
        issue_type: "other",
        status: "new",
        location: "",
        description: "",
      },
    })
  
    const addIssue = async (data: IssueCreate) => {
      await IssuesService.createIssue({ requestBody: data })
    }
  
    const mutation = useMutation(addIssue, {
      onSuccess: () => {
        showToast("Success!", "Issue created successfully.", "success")
        reset()
        onClose()
      },
      onError: (err: ApiError) => {
        const errDetail = err.body?.detail
        showToast("Something went wrong.", `${errDetail}`, "error")
      },
      onSettled: () => {
        queryClient.invalidateQueries("issues")
      },
    })
  
    const onSubmit: SubmitHandler<IssueCreate> = (data) => {
      mutation.mutate(data)
    }
  
    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "sm", md: "md" }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add Issue</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired isInvalid={!!errors.issue_type}>
                <FormLabel htmlFor="issue_type">Issue Type</FormLabel>
                <Select
                    id="issue_type"
                    {...register("issue_type")}
                    defaultValue="other"
                >
                    <option value="plumbing">Plumbing</option>
                    <option value="electrics">Electrics</option>
                    <option value="heating">Heating</option>
                    <option value="furniture">Furniture</option>
                    <option value="other">Other</option>
                </Select>
                {errors.issue_type && (
                  <FormErrorMessage>{errors.issue_type.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select
                    id="status"
                    {...register("status")}
                    defaultValue="new"
                >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="closed">Closed</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input
                    id="location"
                    {...register("location")}
                    placeholder="Location"
                    type="text"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                    id="description"
                    {...register("description")}
                    placeholder="Description"
                    type="text"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter gap={3}>
              <Button variant="primary" type="submit" isLoading={isSubmitting}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
    
export default AddIssue