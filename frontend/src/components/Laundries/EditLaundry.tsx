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
  } from "@chakra-ui/react"
  import { type SubmitHandler, useForm } from "react-hook-form"
  
  import { useMutation, useQueryClient } from "react-query"
  import {
    type ApiError,
    type LaundryOut,
    type LaundryUpdate,
    LaundriesService,
  } from "../../client"
  import useCustomToast from "../../hooks/useCustomToast"
  
  interface EditLaundryProps {
    laundry: LaundryOut
    isOpen: boolean
    onClose: () => void
  }
  
  const EditLaundry = ({ laundry, isOpen, onClose }: EditLaundryProps) => {
    const queryClient = useQueryClient()
    const showToast = useCustomToast()
    const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors, isDirty },
    } = useForm<LaundryUpdate>({
      mode: "onBlur",
      criteriaMode: "all",
      defaultValues: laundry,
    })
  
    const updateItem = async (data: LaundryUpdate) => {
      await LaundriesService.updateLaundry({ id: laundry.id, requestBody: data })
    }
  
    const mutation = useMutation(updateItem, {
      onSuccess: () => {
        showToast("Успех!", "Прачечная обновлена успешно.", "success")
        onClose()
      },
      onError: (err: ApiError) => {
        const errDetail = err.body?.detail
        showToast("Что-то пошло не так.", `${errDetail}`, "error")
      },
      onSettled: () => {
        queryClient.invalidateQueries("laundry")
      },
    })
  
    const onSubmit: SubmitHandler<LaundryUpdate> = async (data) => {
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
              <FormControl isRequired isInvalid={!!errors.room}>
                <FormLabel htmlFor="room">Комната</FormLabel>
                <Input
                    id="room"
                    {...register("room", {
                    required: "Room is required.",
                    })}
                    type="text"
                />
                {errors.room && (
                    <FormErrorMessage>{errors.room.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="washing_machine_number">Номер стиральной машины</FormLabel>
                <Input
                  id="washing_machine_number"
                  {...register("washing_machine_number")}
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
  
  export default EditLaundry
  