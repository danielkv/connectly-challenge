import React from 'react'

import classnames from 'classnames'

import styles from './styles.module.scss'

interface AppNavigationButtonProps {
    href?: string
    title: string
    Icon: React.ReactNode
    selected?: boolean
}

const AppNavigationButton: React.FC<AppNavigationButtonProps> = ({ Icon, title, href, selected }) => {
    return (
        <a
            style={{ display: 'block' }}
            title={title}
            href={href}
            className={classnames(styles.appNavigationButton, { [styles.selected]: selected })}
        >
            <div style={{ color: 'white', textAlign: 'center' }}>{Icon}</div>
        </a>
    )
}

export default AppNavigationButton
