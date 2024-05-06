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
    Select,
  } from "@chakra-ui/react"
  import { type SubmitHandler, useForm } from "react-hook-form"
  
  import { useMutation, useQueryClient } from "react-query"
  import {
    type ApiError,
    type IssueOut,
    type IssueUpdate,
    IssuesService,
  } from "../../client"
  import useCustomToast from "../../hooks/useCustomToast"
  
  interface EditIssueProps {
    issue: IssueOut
    isOpen: boolean
    onClose: () => void
  }
  
  const EditIssue = ({ issue, isOpen, onClose }: EditIssueProps) => {
    const queryClient = useQueryClient()
    const showToast = useCustomToast()
    const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors, isDirty },
    } = useForm<IssueUpdate>({
      mode: "onBlur",
      criteriaMode: "all",
      defaultValues: issue,
    })
  
    const updateItem = async (data: IssueUpdate) => {
      await IssuesService.updateIssue({ id: issue.id, requestBody: data })
    }
  
    const mutation = useMutation(updateItem, {
      onSuccess: () => {
        showToast("Успешно!", "Запрос обновлен успешно.", "success")
        onClose()
      },
      onError: (err: ApiError) => {
        const errDetail = err.body?.detail
        showToast("Что-то пошло не так.", `${errDetail}`, "error")
      },
      onSettled: () => {
        queryClient.invalidateQueries("issues")
      },
    })
  
    const onSubmit: SubmitHandler<IssueUpdate> = async (data) => {
      mutation.mutate(data)
    }
  
    const onCancel = () => {
      reset()
      onClose()
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
            <ModalHeader>Изменить прачечную</ModalHeader>
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
              <Button
                variant="primary"
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!isDirty}
              >
                Сохранить
              </Button>
              <Button onClick={onCancel}>Отменить</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default EditIssue
  