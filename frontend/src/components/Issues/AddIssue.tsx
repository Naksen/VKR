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
            <ModalHeader>Добавить запрос</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired isInvalid={!!errors.issue_type}>
                <FormLabel htmlFor="issue_type">Тип</FormLabel>
                <Select
                    id="issue_type"
                    {...register("issue_type")}
                    defaultValue="other"
                >
                    <option value="plumbing">Сантехника</option>
                    <option value="electrics">Электрика</option>
                    <option value="heating">Отопление</option>
                    <option value="furniture">Мебель</option>
                    <option value="other">Другое</option>
                </Select>
                {errors.issue_type && (
                  <FormErrorMessage>{errors.issue_type.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="status">Статус</FormLabel>
                <Select
                    id="status"
                    {...register("status")}
                    defaultValue="new"
                >
                    <option value="new">Новый</option>
                    <option value="in_progress">Выполняется</option>
                    <option value="completed">Завершен</option>
                    <option value="closed">Закрыт</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="location">Местоположение</FormLabel>
                <Input
                    id="location"
                    {...register("location")}
                    placeholder="Местоположение"
                    type="text"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="description">Описание</FormLabel>
                <Input
                    id="description"
                    {...register("description")}
                    placeholder="Описание"
                    type="text"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter gap={3}>
              <Button variant="primary" type="submit" isLoading={isSubmitting}>
                Сохранить
              </Button>
              <Button onClick={onClose}>Отменить</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
    
export default AddIssue