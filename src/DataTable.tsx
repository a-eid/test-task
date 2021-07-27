import { useAppDispatch, useAppSelector } from "./redux/store"
import { deleteUser, updateUserModal } from "./redux/usersSlice"

export function DataTable() {
  const users = useAppSelector(state => state.users.users)
  const filter = useAppSelector(state => state.users.filter)
  const dispatch = useAppDispatch()

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))
          .map((item, index) => (
            <tr key={item.id.toString()}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className="action_button"
                  onClick={() => {
                    dispatch(
                      updateUserModal({
                        type: "editing",
                        index,
                      }),
                    )
                  }}
                >
                  Edit
                </button>{" "}
                |{" "}
                <button
                  className="action_button action_button--danger"
                  onClick={() => {
                    if (window.confirm(`are you sure you want to delete ${users[index].name}`)) {
                      dispatch(deleteUser(index))
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
