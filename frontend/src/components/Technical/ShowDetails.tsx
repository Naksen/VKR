import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { TechnicalService, type IssueDetails, type ApiError } from "../../client";

interface TechnicalProps {
    issue_id: number;
    isOpen: boolean;
    onClose: () => void;
}

const ShowDetails = ({ issue_id, isOpen, onClose }: TechnicalProps) => {
    // Загрузка деталей проблемы с сервера
    const { data, isLoading, error } = useQuery<IssueDetails, ApiError>(
        ['issueDetails', issue_id],
        () => TechnicalService.getDetails({ issueId: issue_id }),
        {
            enabled: isOpen, // Запуск запроса только если модальное окно открыто
            refetchOnWindowFocus: false // Отключение повторной загрузки при фокусировке окна
        }
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: "sm", md: "md" }}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Детали Проблемы</ModalHeader>
                <ModalCloseButton />
                {isLoading ? (
                    <ModalBody>
                        <Text>Loading...</Text>
                    </ModalBody>
                ) : error ? (
                    <ModalBody>
                        <Text>Ошибка при загрузке данных: {error.message}</Text>
                    </ModalBody>
                ) : (
                    <>
                        <ModalBody>
                            <Text fontWeight="bold">Местоположение:</Text>
                            <Text>{data?.location || 'Не указано'}</Text>
                        </ModalBody>
                        <ModalBody>
                            <Text fontWeight="bold">Описание:</Text>
                            <Text>{data?.description || 'Не указано'}</Text>
                        </ModalBody>
                    </>
                )}
                <ModalFooter>
                    <Button onClick={onClose}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ShowDetails;