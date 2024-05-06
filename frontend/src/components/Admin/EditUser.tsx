import {
  Button,
  Checkbox,
  Flex,
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
  type UserOut,
  type UserUpdate,
  UsersService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { emailPattern } from "../../utils"

interface EditUserProps {
  user: UserOut
  isOpen: boolean
  onClose: () => void
}

interface UserUpdateForm extends UserUpdate {
  confirm_password: string
}

const EditUser = ({ user, isOpen, onClose }: EditUserProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UserUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: user,
  })

  const updateUser = async (data: UserUpdateForm) => {
    await UsersService.updateUser({ userId: user.id, requestBody: data })
  }

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      showToast("Успех!", "Пользователь обновлен успешно.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Что-то пошло не так", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("users")
    },
  })

  const onSubmit: SubmitHandler<UserUpdateForm> = async (data) => {
    if (data.password === "") {
      data.password = undefined
    }
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
          <ModalHeader>Изменить пользователя</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Почта</FormLabel>
              <Input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: emailPattern,
                })}
                type="email"
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="name">Полное имя</FormLabel>
              <Input id="name" {...register("full_name")} type="text" />
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.phone}>
              <FormLabel htmlFor="phone">Телефон</FormLabel>
              <Input
                id="phone"
                {...register("phone")}
                type="text"
              />
              {errors.phone && (
                <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.room}>
              <FormLabel htmlFor="room">Комната</FormLabel>
              <Input
                id="room"
                {...register("room")}
                type="text"
              />
              {errors.room && (
                <FormErrorMessage>{errors.room.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.study_group}>
              <FormLabel htmlFor="study_group">Учебная группа</FormLabel>
              <Input
                id="study_group"
                {...register("study_group")}
                type="text"
              />
              {errors.study_group && (
                <FormErrorMessage>{errors.study_group.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.institute}>
              <FormLabel htmlFor="institute">Институт</FormLabel>
              <Input
                id="institute"
                {...register("institute")}
                type="text"
              />
              {errors.institute && (
                <FormErrorMessage>{errors.institute.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Новый пароль</FormLabel>
              <Input
                id="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Пароль"
                type="password"
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.confirm_password}>
              <FormLabel htmlFor="confirm_password">Подтвердить пароль</FormLabel>
              <Input
                id="confirm_password"
                {...register("confirm_password", {
                  validate: (value) =>
                    value === getValues().password ||
                    "The passwords do not match",
                })}
                placeholder="Пароль"
                type="password"
              />
              {errors.confirm_password && (
                <FormErrorMessage>
                  {errors.confirm_password.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <Flex>
              <FormControl mt={4}>
                <Checkbox {...register("is_superuser")} colorScheme="teal">
                  Суперпользователь
                </Checkbox>
              </FormControl>
              <FormControl mt={4}>
                <Checkbox {...register("is_active")} colorScheme="teal">
                  Активный
                </Checkbox>
              </FormControl>
              <FormControl mt={4}>
                <Checkbox {...register("is_technical_staff")} colorScheme="teal">
                  Техперсонал
                </Checkbox>
              </FormControl>
            </Flex>
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

export default EditUser
