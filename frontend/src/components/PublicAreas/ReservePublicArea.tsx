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
    List,
    ListItem,
    ListIcon,
    Box
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiClock } from "react-icons/fi";
import { format } from "date-fns";
import { ru } from "date-fns/locale"

import { type ApiError, type ScheduleCreate, type SchedulesOut, PublicAreaService, PublicAreaOut } from "../../client";
import useCustomToast from "../../hooks/useCustomToast";

interface ReservePublicAreaProps {
    public_area: PublicAreaOut;
    isOpen: boolean;
    onClose: () => void;
}

const ReservePublicArea = ({ public_area, isOpen, onClose }: ReservePublicAreaProps) => {
    const queryClient = useQueryClient();
    const showToast = useCustomToast();
    const { data } = useQuery<SchedulesOut, ApiError>(
        ['public_areaSchedules', public_area.id],
        () => PublicAreaService.getPublicAreaSchedules({ id: public_area.id }),
        { enabled: isOpen } // Only run the query if the modal is open
    );

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'PPPpp', { locale: ru });
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<ScheduleCreate>({
        mode: "onBlur",
        criteriaMode: "all",
    });

    const reservePublicArea = async (data: ScheduleCreate) => {
        await PublicAreaService.reservePublicArea({ id: public_area.id, requestBody: data });
    };

    const mutation = useMutation(reservePublicArea, {
        onSuccess: () => {
            showToast("Success!", "Public area reserved successfully.", "success");
            reset();
            onClose();
        },
        onError: (err: ApiError) => {
            const errDetail = err.body?.detail;
            showToast("Something went wrong.", `${errDetail}`, "error");
        },
        onSettled: () => {
            queryClient.invalidateQueries(['public_areaSchedules', public_area.id]);
        },
    });

    const onSubmit: SubmitHandler<ScheduleCreate> = (data) => {
        mutation.mutate(data);
    };

    const onCancel = () => {
        reset();
        onClose();
    };

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
                    <ModalHeader>Забронировать общественную зону</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Ближайшие брони:</p>
                    </ModalBody>
                    <ModalBody pb={6}>
                        <Box mb={4}>
                            <List spacing={3}>
                                {data?.data.map(schedule => (
                                    <ListItem key={schedule.id}>
                                        <ListIcon as={FiClock} color="green.500" />
                                        {formatDate(schedule.start_time)} - {formatDate(schedule.end_time)}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <FormControl isInvalid={!!errors.start_time}>
                            <FormLabel htmlFor="start_time">Начало</FormLabel>
                            <Input
                                id="start_time"
                                {...register("start_time", {
                                    required: "Start time is required",
                                })}
                                type="datetime-local"
                            />
                            {errors.start_time && (
                                <FormErrorMessage>{errors.start_time.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={!!errors.end_time}>
                            <FormLabel htmlFor="end_time">Конец</FormLabel>
                            <Input
                                id="end_time"
                                {...register("end_time", {
                                    required: "End time is required",
                                })}
                                type="datetime-local"
                            />
                            {errors.end_time && (
                                <FormErrorMessage>{errors.end_time.message}</FormErrorMessage>
                            )}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button
                            variant="primary"
                            type="submit"
                            isLoading={isSubmitting}
                            isDisabled={!isDirty}
                        >
                            Забронировать
                        </Button>
                        <Button onClick={onCancel}>Отменить</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ReservePublicArea;