import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import {
  type ApiError,
  type UserOut,
  type UserUpdateMe,
  UsersService,
} from "../../client"
import useAuth from "../../hooks/useAuth"
import useCustomToast from "../../hooks/useCustomToast"
import { emailPattern } from "../../utils"

const UserInformation = () => {
  const queryClient = useQueryClient()
  const color = useColorModeValue("inherit", "ui.white")
  const showToast = useCustomToast()
  const [editMode, setEditMode] = useState(false)
  const { user: currentUser } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<UserOut>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      full_name: currentUser?.full_name,
      email: currentUser?.email,
    },
  })

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const updateInfo = async (data: UserUpdateMe) => {
    await UsersService.updateUserMe({ requestBody: data })
  }

  const mutation = useMutation(updateInfo, {
    onSuccess: () => {
      showToast("Успех!", "Пользователь обновлен успешно.", "success")
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Что-то пошло не так.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("users")
      queryClient.invalidateQueries("currentUser")
    },
  })

  const onSubmit: SubmitHandler<UserUpdateMe> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    toggleEditMode()
  }

  return (
    <>
      <Container maxW="full" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Heading size="sm" py={4}>
          Информация о пользователе
        </Heading>
        <Box w={{ sm: "full", md: "50%" }}>
          <FormControl>
            <FormLabel color={color} htmlFor="name">
              Полное имя
            </FormLabel>
            {editMode ? (
              <Input
                id="name"
                {...register("full_name", { maxLength: 30 })}
                type="text"
                size="md"
              />
            ) : (
              <Text
                size="md"
                py={2}
                color={!currentUser?.full_name ? "gray.400" : "inherit"}
              >
                {currentUser?.full_name || "N/A"}
              </Text>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={!!errors.email}>
            <FormLabel color={color} htmlFor="email">
              Почта
            </FormLabel>
            {editMode ? (
              <Input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: emailPattern,
                })}
                type="email"
                size="md"
              />
            ) : (
              <Text size="md" py={2}>
                {currentUser?.email}
              </Text>
            )}
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
            <FormControl mt={4} isInvalid={!!errors.phone}>
              <FormLabel htmlFor="phone">Телефон</FormLabel>
              {editMode ? (
              <Input
                id="phone"
                {...register("phone")}
                type="text"
              />
              ) : (
                <Text size="md" py={2}>
                  {currentUser?.phone}
                </Text>
              )}
              {errors.phone && (
                <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.room}>
              <FormLabel htmlFor="room">Комната</FormLabel>
              {editMode ? (
              <Input
                id="room"
                {...register("room")}
                type="text"
              />
              ) : (
                <Text size="md" py={2}>
                  {currentUser?.room}
                </Text>
              )}
              {errors.room && (
                <FormErrorMessage>{errors.room.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.study_group}>
              <FormLabel htmlFor="study_group">Учебная группа</FormLabel>
              {editMode ? (
              <Input
                id="study_group"
                {...register("study_group")}
                type="text"
              />
              ) : (
                <Text size="md" py={2}>
                  {currentUser?.study_group}
                </Text>
              )}
              {errors.study_group && (
                <FormErrorMessage>{errors.study_group.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.institute}>
              <FormLabel htmlFor="institute">Институт</FormLabel>
              {editMode ? (
              <Input
                id="institute"
                {...register("institute")}
                type="text"
              />
              ) : (
                <Text size="md" py={2}>
                  {currentUser?.study_group}
                </Text>
              )}
              {errors.institute && (
                <FormErrorMessage>{errors.institute.message}</FormErrorMessage>
              )}
            </FormControl>
          <Flex mt={4} gap={3}>
            <Button
              variant="primary"
              onClick={toggleEditMode}
              type={editMode ? "button" : "submit"}
              isLoading={editMode ? isSubmitting : false}
              isDisabled={editMode ? !isDirty || !getValues("email") : false}
            >
              {editMode ? "Сохранить" : "Изменить"}
            </Button>
            {editMode && (
              <Button onClick={onCancel} isDisabled={isSubmitting}>
                Отменить
              </Button>
            )}
          </Flex>
        </Box>
      </Container>
    </>
  )
}

export default UserInformation
