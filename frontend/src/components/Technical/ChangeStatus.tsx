import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    FormControl,
    FormLabel,
    Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { TechnicalService, type IStatusEnum, type ApiError } from "../../client";
import useCustomToast from "../../hooks/useCustomToast";

interface TechnicalProps {
    issue_id: number;
    isOpen: boolean;
    onClose: () => void;
}

type IssueStatus = {
    status: IStatusEnum
};

const ChangeStatus = ({ issue_id, isOpen, onClose }: TechnicalProps) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<IssueStatus>();
    const queryClient = useQueryClient();
    const showToast = useCustomToast();

    const mutation = useMutation(
        ({ issueId, newStatus }: { issueId: number; newStatus: IStatusEnum }) =>
        TechnicalService.changeStatus({ issueId, newStatus }),
        {
        onSuccess: () => {
            showToast("Успех!", "Статус обновлен успешно.", "success");
            onClose();
            queryClient.invalidateQueries(['issueDetails', issue_id]);
        },
        onError: (err: ApiError) => {
            const errDetail = err.body?.detail || "Failed to update status.";
            showToast("Что-то пошло не так.", errDetail, "error");
        }
        }
    );

    const onSubmit = (data: { status: IStatusEnum }) => {
        mutation.mutate({ issueId: issue_id, newStatus: data.status });
    };

    return (
            <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: "sm", md: "md" }}
            isCentered
            >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>Изменить статус</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <FormControl mt={4}>
                    <FormLabel htmlFor="status">Статус</FormLabel>
                    <Select
                    id="status"
                    {...register("status", { required: true })}
                    placeholder="Выберите статус"
                    >
                    <option value="new">Новый</option>
                    <option value="in_progress">Выполняется</option>
                    <option value="completed">Завершен</option>
                    <option value="closed">Закрыт</option>
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
        );
    }
  
export default ChangeStatus;