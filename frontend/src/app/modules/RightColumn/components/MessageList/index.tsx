import React from 'react';
import cx from 'classnames';
import { Typography } from 'antd';
import { Message } from 'app/models/message';
import { User } from 'app/models/user';
import styles from './styles.less';

const { Text } = Typography;

interface Props {
    data: Message[];
    user: User;
}

export const MessageList: React.FC<Props> = ({ data, user }) => (
    <div className={styles.MessageList}>
        {data?.map((item, index, list) => {
            const firstInGroup = !index || list[index - 1].creator.id !== item.creator.id;

            return (
                <div
                    className={cx(styles.Message, {
                        [styles.own]: item.creator.id === user.id, [styles.first_in_group]: firstInGroup
                    })}
                >
                    {firstInGroup && <div className={styles.arrow} />}
                    <Text>{item.body}</Text>
                </div>
            )
        })}
    </div>
);
