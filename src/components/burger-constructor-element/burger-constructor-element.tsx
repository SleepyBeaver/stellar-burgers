import { FC, memo } from 'react';
import { useAppDispatch } from '../../services/store';
import {
  removeIngredient,
  moveIngredient
} from '../../services/slices/constructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredient({ dragIndex: index, hoverIndex: index + 1 }));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredient({ dragIndex: index, hoverIndex: index - 1 }));
      }
    };

    const handleClose = () => {
      if (ingredient.type !== 'bun') {
        dispatch(removeIngredient(ingredient.id));
      }
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
