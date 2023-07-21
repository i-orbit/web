import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from '@tabler/icons-react';

class Messages {
    error(message) {
        notifications.show({
            message: message,
            color: 'red',
            icon: <IconX size='1.2rem'/>,
            radius: 'sm',
            withCloseButton: false,
        })
    }

    success(message) {
        notifications.show({
            message: message,
            color: 'green',
            icon: <IconCheck size='1.2rem'/>,
            radius: 'sm',
            withCloseButton: false,
        })
    }

}

const messages = new Messages();
export default messages;