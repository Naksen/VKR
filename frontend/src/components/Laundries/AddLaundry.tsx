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
  Checkbox,
} from "@chakra-ui/react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type ApiError, type LaundryCreate, LaundriesService} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddLaundryProps {
  isOpen: boolean
  onClose: () => void
}

const AddLaundry = ({ isOpen, onClose }: AddLaundryProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LaundryCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      room: "",
      washing_machine_number: 0,
      is_busy: false
    },
  })

  const addLaundry = async (data: LaundryCreate) => {
    await LaundriesService.createLaundry({ requestBody: data })
  }

  const mutation = useMutation(addLaundry, {
    onSuccess: () => {
      showToast("Success!", "Laundry created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("laundries")
    },
  })

  const onSubmit: SubmitHandler<LaundryCreate> = (data) => {
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
          <ModalHeader>Добавить прачечную</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.room}>
              <FormLabel htmlFor="room">Комната</FormLabel>
              <Input
                id="room"
                {...register("room", {
                  required: "Room is required.",
                })}
                placeholder="Комната"
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
                placeholder="Washing Machine Number"
                type="number"
              />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel htmlFor="is_busy">Занята</FormLabel>
                <Checkbox
                    id="is_busy"
                    {...register("is_busy")}
                    colorScheme="teal"
                >
                </Checkbox>
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
  
export default AddLaundry