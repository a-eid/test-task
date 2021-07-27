import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import json from "../data.json"
import { sortAlphabetically } from "../utils"

type UserFormState =
  | undefined
  | {
      type: "adding"
    }
  | {
      type: "editing"
      index: number
    }

export interface UserState {
  users: User[]
  filter: string
  formState: UserFormState
}

// NOTE: cachedUsers should be sorted by default.
const cachedUsers = localStorage.getItem("users")

const initialState: UserState = {
  users: (cachedUsers ? JSON.parse(cachedUsers) : sortAlphabetically(json, "name")) as User[],
  filter: "",
  formState: undefined,
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users = sortAlphabetically([...state.users, action.payload], "name") as User[]
    },

    updateUser(state, action: PayloadAction<[number, User]>) {
      const [index, user] = action.payload
      state.users.splice(index, 1)
      state.users = sortAlphabetically([...state.users, user], "name") as User[]
    },

    deleteUser(state, action: PayloadAction<number>) {
      state.users.splice(action.payload, 1)
    },

    filterUsers(state, action: PayloadAction<string>) {
      state.filter = action.payload
    },

    updateUserModal(state, action: PayloadAction<UserFormState>) {
      state.formState = action.payload
    },
  },
})

export const { addUser, deleteUser, filterUsers, updateUser, updateUserModal } = usersSlice.actions
export const { reducer } = usersSlice
