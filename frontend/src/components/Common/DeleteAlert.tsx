import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import React from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { ItemsService, UsersService, LaundriesService, PublicAreaService, IssuesService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface DeleteProps {
  type: string
  id: number
  isOpen: boolean
  onClose: () => void
}

const Delete = ({ type, id, isOpen, onClose }: DeleteProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const deleteEntity = async (id: number) => {
    if (type === "Item") {
      await ItemsService.deleteItem({ id: id })
    } else if (type === "User") {
      await UsersService.deleteUser({ userId: id })
    } else if (type == "Laundry") {
      await LaundriesService.deleteLaundry({ id: id })
    } else if (type == "PublicArea") {
      await PublicAreaService.deletePublicArea({id: id})
    } else if (type == "Issue") {
      await IssuesService.deleteIssue({id: id})
    } else {
      throw new Error(`Unexpected type: ${type}`)
    }
  }

  const mutation = useMutation(deleteEntity, {
    onSuccess: () => {
      showToast(
        "Успешно",
        `${type.toLowerCase()} был удален успешно.`,
        "success",
      )
      onClose()
    },
    onError: () => {
      showToast(
        "Возникла ошибка",
        `Ошибка вознила в процессе удаления ${type.toLowerCase()}.`,
        "error",
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries(type === "Item" ? "items" : type == "User" ? "users" : type == "Laundry" ? "laundries" : type == "PublicArea" ? "public_areas" : "issues")
    },
  })

  const onSubmit = async () => {
    mutation.mutate(id)
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>Удалить {type}</AlertDialogHeader>

            <AlertDialogFooter gap={3}>
              <Button variant="danger" type="submit" isLoading={isSubmitting}>
               Удалить
              </Button>
              <Button
                ref={cancelRef}
                onClick={onClose}
                isDisabled={isSubmitting}
              >
                Отменить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default Delete
