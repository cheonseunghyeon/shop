import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Item {
  id: number;
  name: string;
  brand: string;
  createdAt: Date;
}
interface ShoppingListState {
  items: Item[];
}
const initialState: ShoppingListState = {
  items: [],
};

const shoppinglistSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const newItem: Item = {
        id: state.items.length + 1, // 새 항목의 ID는 현재 항목 수에 1을 더한 값으로 설정
        name: action.payload.name,
        brand: action.payload.brand,
        createdAt: new Date(),
      };
      state.items.push(newItem);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const {id, name, brand, createdAt} = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.name = name;
        itemToUpdate.brand = brand;
        itemToUpdate.createdAt = createdAt;
      }
    },
  },
});
export const {addItem, removeItem, updateItem} = shoppinglistSlice.actions;
export default shoppinglistSlice.reducer;
