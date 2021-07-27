import * as React from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "./redux/store"
import { addUser, updateUser, updateUserModal } from "./redux/usersSlice"

export function UserFormModal() {
  const formState = useAppSelector(state => state.users.formState)

  if (formState === undefined) return null

  return (
    <div className="userform__container">
      <UserForm index={formState.type === "editing" ? formState.index : undefined} />
    </div>
  )
}

function UserForm({ index }: { index?: number }) {
  const dispatch = useAppDispatch()
  const users = useAppSelector(state => state.users.users)
  const [user, setUser] = React.useState<User>(() =>
    index !== undefined
      ? users[index]
      : {
          id: Date.now(),
          name: "",
          email: "",
          company: { name: "" },
          address: { city: "" },
        },
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (index !== undefined) {
      dispatch(updateUser([index, user]))
    } else {
      dispatch(addUser(user))
    }
    dispatch(updateUserModal(undefined))
  }

  return (
    <form className="userform__form" onSubmit={handleSubmit}>
      <button
        className="action_button action_button--close"
        onClick={() => {
          dispatch(updateUserModal(undefined))
        }}
        type="button"
      >
        <AiFillCloseCircle size={25} />
      </button>
      <input
        placeholder="name"
        required
        value={user.name}
        onChange={e => {
          setUser(prevUser => ({
            ...prevUser,
            name: e.target.value,
          }))
        }}
      />
      <input
        placeholder="email"
        required
        value={user.email}
        type="email"
        onChange={e => {
          setUser(prevUser => ({
            ...prevUser,
            email: e.target.value,
          }))
        }}
      />
      <input
        placeholder="city"
        required
        value={user.address.city}
        onChange={e => {
          setUser(prevUser => ({
            ...prevUser,
            address: {
              ...prevUser.address,
              city: e.target.value,
            },
          }))
        }}
      />
      <input
        placeholder="Company Name"
        required
        value={user.company.name}
        onChange={e => {
          setUser(prevUser => ({
            ...prevUser,
            company: {
              ...prevUser.company,
              name: e.target.value,
            },
          }))
        }}
      />
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  )
}
