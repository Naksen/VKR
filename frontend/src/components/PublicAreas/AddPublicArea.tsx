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

import { type ApiError, type PublicAreaCreate, PublicAreaService} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddPublicAreaProps {
isOpen: boolean
onClose: () => void
}

const AddPublicArea = ({ isOpen, onClose }: AddPublicAreaProps) => {
    const queryClient = useQueryClient()
    const showToast = useCustomToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PublicAreaCreate>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
        name: "",
        description: "",
        capacity: 1,
        area_type: 'other'
        },
    })

    const addPublicArea = async (data: PublicAreaCreate) => {
        await PublicAreaService.createPublicArea({ requestBody: data })
    }

    const mutation = useMutation(addPublicArea, {
        onSuccess: () => {
        showToast("Success!", "Public area created successfully.", "success")
        reset()
        onClose()
        },
        onError: (err: ApiError) => {
        const errDetail = err.body?.detail
        showToast("Something went wrong.", `${errDetail}`, "error")
        },
        onSettled: () => {
        queryClient.invalidateQueries("public_areas")
        },
    })

    const onSubmit: SubmitHandler<PublicAreaCreate> = (data) => {
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
            <ModalHeader>Добавить общественную зону</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Название</FormLabel>
                <Input
                    id="name"
                    {...register("name", {
                    required: "Название необходимо.",
                    })}
                    placeholder="Название"
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
                    placeholder="Описание"
                    type="text"
                />
                </FormControl>
                <FormControl mt={4}>
                <FormLabel htmlFor="capacity">Вместительность</FormLabel>
                <Input
                    id="capacity"
                    {...register("capacity")}
                    placeholder="Capacity"
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

export default AddPublicArea
