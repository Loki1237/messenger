import React, { useCallback, useEffect, useRef, useState, CSSProperties } from 'react';
import cx from 'classnames';
import { Typography } from 'antd';
import { TeamOutlined, CommentOutlined , SettingOutlined  } from '@ant-design/icons';
import styles from './styles.less';

const { Text } = Typography;

interface Props {
    value: number;
    onChange: (value: number) => void;
}

const items = [
    { key: 0, title: 'CONTACTS', icon: TeamOutlined },
    { key: 1, title: 'CHATS', icon: CommentOutlined },
    { key: 2, title: 'SETTINGS', icon: SettingOutlined },
];

export const Navigation: React.FC<Props> = ({ value, onChange }) => {
    const [linePosition, setLinePosition] = useState<CSSProperties>(null)
    const activeTab = useRef<HTMLDivElement>(null);

    const moveLine = useCallback(() => {
        if (activeTab.current) {
            const { offsetLeft, offsetWidth } = activeTab.current;

            setLinePosition({ left: offsetLeft, width: offsetWidth });
        }
    }, []);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        activeTab.current = e.currentTarget;
        onChange(Number(e.currentTarget.getAttribute('data-value')));
        moveLine();
    }, [onChange]);

    const handleRef = useCallback((key: number) => (elem: HTMLDivElement) => {
        if (!activeTab.current && key === value) {
            activeTab.current = elem;
        }
    }, [value]);

    useEffect(() => {
        moveLine();
        window.addEventListener('resize', moveLine);

        return () => window.removeEventListener('resize', moveLine)
    }, []);

    return (
        <div className={styles.Navigation}>
            {items.map(({ key, title, icon: Icon }) => (
                <div
                    ref={handleRef(key)}
                    data-value={key}
                    className={cx(styles.item, { [styles.item_active]: key === value })}
                    onClick={handleClick}
                >
                    <Icon className={styles.item_icon} />
                    <Text className={styles.item_text}>{title}</Text>
                </div>
            ))}

            <div className={styles.line} style={linePosition} />
        </div>
    );
};
