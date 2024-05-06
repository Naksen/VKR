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
    Text,
    TableContainer
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import ActionsMenu from "../../components/Common/ActionsMenu"

import { type ApiError, type LaundrySchedulesOut, SchedulesService } from "../../client";

interface LaundrySchedulesProps {
    isOpen: boolean;
    onClose: () => void;
}

const MyLaundrySchedules = ({ isOpen, onClose }: LaundrySchedulesProps) => {
    const { data, isLoading } = useQuery<LaundrySchedulesOut, ApiError>(
        'myLaundrySchedules',
        () => SchedulesService.getMyLaundriesSchedules({}),
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
            size={{ base: "sm", md: "xl" }} // Изменен размер для лучшего отображения таблицы
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
                        <TableContainer>
                            <Table size={{ base: "sm", md: "md"}}>
                                <Thead>
                                    <Tr>
                                        <Th>Номер комнаты</Th>
                                        <Th>Номер машины</Th>
                                        <Th>Время начала</Th>
                                        <Th>Время окончания</Th>
                                        <Th width="10%">Действия</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data?.data.map((schedule) => (
                                        <Tr key={schedule.id}>
                                            <Td>{schedule.room}</Td>
                                            <Td>{schedule.washing_machine_number}</Td>
                                            <Td>{formatDate(schedule.start_time)}</Td>
                                            <Td>{formatDate(schedule.end_time)}</Td>
                                            <Td>
                                                <ActionsMenu type={"LaundrySchedule"} value={schedule} />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default MyLaundrySchedules;