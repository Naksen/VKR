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
  import {
    type ApiError,
    type PublicAreaOut,
    type PublicAreaUpdate,
    PublicAreaService,
  } from "../../client"
  import useCustomToast from "../../hooks/useCustomToast"
  
  interface EditPublicAreaProps {
    public_area: PublicAreaOut
    isOpen: boolean
    onClose: () => void
  }
  
  const EditPublicArea = ({ public_area, isOpen, onClose }: EditPublicAreaProps) => {
    const queryClient = useQueryClient()
    const showToast = useCustomToast()
    const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors, isDirty },
    } = useForm<PublicAreaUpdate>({
      mode: "onBlur",
      criteriaMode: "all",
      defaultValues: public_area,
    })
  
    const updateItem = async (data: PublicAreaUpdate) => {
      await PublicAreaService.updatePublicArea({ id: public_area.id, requestBody: data })
    }
  
    const mutation = useMutation(updateItem, {
      onSuccess: () => {
        showToast("Успех!", "Общественная зона обновлена успешно.", "success")
        onClose()
      },
      onError: (err: ApiError) => {
        const errDetail = err.body?.detail
        showToast("Что-то пошло не так.", `${errDetail}`, "error")
      },
      onSettled: () => {
        queryClient.invalidateQueries("public_area")
      },
    })
  
    const onSubmit: SubmitHandler<PublicAreaUpdate> = async (data) => {
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
            <ModalHeader>Изменить общественную зону</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Название</FormLabel>
                <Input
                    id="name"
                    {...register("name", {
                    required: "Название необходимо.",
                    })}
                    type="text"
                />
                {errors.name && (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
                </FormControl>
                <FormControl mt={4}>
                <FormLabel htmlFor="description">Описание</FormLabel>
                <Input
                    id="description"
                    {...register("description")}
                    type="text"
                />
                </FormControl>
                <FormControl mt={4}>
                <FormLabel htmlFor="capacity">Вместительность</FormLabel>
                <Input
                    id="capacity"
                    {...register("capacity")}
                    type="number"
                />
                </FormControl>
                <FormControl mt={4}>
                <FormLabel htmlFor="area_type">Тип</FormLabel>
                <Select
                    id="area_type"
                    {...register("area_type")}
                    defaultValue="other"
                >
                    <option value="sport">Спортивная</option>
                    <option value="dancing">Танцевальная</option>
                    <option value="gaming">Игровая</option>
                    <option value="other">Другая</option>
                </Select>
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
  
  export default EditPublicArea
  