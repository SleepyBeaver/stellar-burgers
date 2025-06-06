import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? 'primary' : 'secondary';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link to='/' className={styles.link}>
            <BurgerIcon type={isActive('/')} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link to='/feed' className={styles.link}>
            <ListIcon type={isActive('/feed')} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>

        <Link to='/' className={styles.logo}>
          <Logo className='' />
        </Link>

        <Link to='/profile' className={styles.link_position_last}>
          <ProfileIcon type={isActive('/profile')} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </nav>
    </header>
  );
};
