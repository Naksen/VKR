import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { type ApiError, type PublicAreaSchedulesOut, SchedulesService } from "../../client";

interface PublicAreaSchedulesProps {
    isOpen: boolean;
    onClose: () => void;
}

const MyPublicAreaSchedules = ({ isOpen, onClose }: PublicAreaSchedulesProps) => {
    const { data, isLoading } = useQuery<PublicAreaSchedulesOut, ApiError>(
        'myPublicAreaSchedules',
        () => SchedulesService.getMyPublicAreaSchedules({}),
        {
            enabled: isOpen
        }
    );

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'PPPpp', { locale: ru });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: "sm", md: "lg" }} // Изменен размер для лучшего отображения таблицы
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Мои бронирования</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Название зоны</Th>
                                    <Th>Тип зоны</Th>
                                    <Th>Время начала</Th>
                                    <Th>Время окончания</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.data.map((schedule) => (
                                    <Tr key={schedule.id}>
                                        <Td>{schedule.name}</Td>
                                        <Td>{schedule.area_type}</Td>
                                        <Td>{formatDate(schedule.start_time)}</Td>
                                        <Td>{formatDate(schedule.end_time)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default MyPublicAreaSchedules;