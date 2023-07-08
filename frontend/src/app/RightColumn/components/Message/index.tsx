import React from 'react';
import cx from 'classnames';
import { Typography } from 'antd';
import styles from './styles.less';

const { Text } = Typography;

interface Props {
    firstInGroup: boolean;
    body: string;
    own: boolean;
}

export const Message: React.FC<Props> = ({ firstInGroup, body, own }) => (
    <div className={cx(styles.Message, { [styles.own]: own, [styles.first_in_group]: firstInGroup })}>
        {firstInGroup && <div className={styles.arrow} />}
        <Text>{body}</Text>
    </div>
);
