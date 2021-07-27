import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { reducer as users } from "./usersSlice"

export const store = configureStore({
  reducer: {
    users,
  },
})

const oldUsers = store.getState().users.users
store.subscribe(() => {
  const users = store.getState().users.users
  if (oldUsers !== users) {
    console.log("hydrating users..")
    localStorage.setItem("users", JSON.stringify(users))
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
