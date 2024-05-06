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

import { type UserCreate, UsersService } from "../../client"
import type { ApiError } from "../../client/core/ApiError"
import useCustomToast from "../../hooks/useCustomToast"
import { emailPattern } from "../../utils"

interface AddUserProps {
  isOpen: boolean
  onClose: () => void
}

interface UserCreateForm extends UserCreate {
  confirm_password: string
}

const AddUser = ({ isOpen, onClose }: AddUserProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserCreateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
      is_superuser: false,
      is_active: false,
      is_technical_staff: false,
    },
  })

  const addUser = async (data: UserCreate) => {
    await UsersService.createUser({ requestBody: data })
  }

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      showToast("Успех!", "Пользователь создан успешно.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Что-то пошло не так.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("users")
    },
  })

  const onSubmit: SubmitHandler<UserCreateForm> = (data) => {
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
          <ModalHeader>Добавить пользователя</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Почта</FormLabel>
              <Input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: emailPattern,
                })}
                placeholder="Email"
                type="email"
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.full_name}>
              <FormLabel htmlFor="name">Полное имя</FormLabel>
              <Input
                id="name"
                {...register("full_name")}
                placeholder="Полное имя"
                type="text"
              />
              {errors.full_name && (
                <FormErrorMessage>{errors.full_name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.phone}>
              <FormLabel htmlFor="phone">Телефон</FormLabel>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+7"
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
                placeholder="7104"
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
                placeholder="М8О-408Б-20"
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
                placeholder="8"
                type="text"
              />
              {errors.institute && (
                <FormErrorMessage>{errors.institute.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isRequired isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <Input
                id="password"
                {...register("password", {
                  required: "Password is required",
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
            <FormControl
              mt={4}
              isRequired
              isInvalid={!!errors.confirm_password}
            >
              <FormLabel htmlFor="confirm_password">Подтвердить пароль</FormLabel>
              <Input
                id="confirm_password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
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
            <Flex mt={4}>
              <FormControl>
                <Checkbox {...register("is_superuser")} colorScheme="teal">
                  Суперпользователь
                </Checkbox>
              </FormControl>
              <FormControl>
                <Checkbox {...register("is_active")} colorScheme="teal">
                  Активный
                </Checkbox>
              </FormControl>
              <FormControl>
                <Checkbox {...register("is_technical_staff")} colorScheme="teal">
                  Техперсонал
                </Checkbox>
              </FormControl>
            </Flex>
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

export default AddUser
