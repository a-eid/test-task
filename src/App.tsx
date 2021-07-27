import { DataTable } from "./DataTable"
import { Header } from "./Header"
import { Provider } from "react-redux"

import { store } from "./redux/store"

import "./App.css"
import { UserFormModal } from "./UserFormModal"

export function App() {
  return (
    <Provider store={store}>
      <div className="App__container">
        <Header />
        <DataTable />
        <UserFormModal />
      </div>
    </Provider>
  )
}
