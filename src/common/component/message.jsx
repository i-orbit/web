import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from '@tabler/icons-react';

class Message {
    error(content): void {
        notifications.show({
            message: content,
            color: 'red',
            icon: <IconX size='1.2rem'/>,
            radius: 'sm',
            withCloseButton: false,
            withBorder: true
        })
    }

    success(content) {
        notifications.show({
            message: content,
            color: 'green',
            icon: <IconCheck size='1.2rem'/>,
            radius: 'sm',
            withCloseButton: false,
            withBorder: true
        })
    }
}

export const message = new Message();