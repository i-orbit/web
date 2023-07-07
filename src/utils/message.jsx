import {notifications} from "@mantine/notifications";
import { IconX } from '@tabler/icons-react';

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

}

const messages = new Messages();
export default messages;