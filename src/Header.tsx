import * as React from "react"
import { BsFillMicFill, BsFileArrowDown, BsFillPersonPlusFill } from "react-icons/bs"
import exportFromJSON from "export-from-json"
import { store, useAppDispatch, useAppSelector } from "./redux/store"
import { filterUsers, updateUserModal } from "./redux/usersSlice"

// @ts-ignore
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.interimResults = true
recognition.lang = "en-US"

export function Header() {
  const [activelyListening, setActivelyListening] = React.useState(false)
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.users.filter)

  function handleAddUserClick() {
    dispatch(updateUserModal({ type: "adding" }))
  }

  React.useEffect(() => {
    function handleStartListening() {
      setActivelyListening(true)
    }

    function handleEndListening() {
      setActivelyListening(false)
    }

    function handleSpeechResult(event: SpeechRecognitionEvent) {
      const filter = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")

      dispatch(filterUsers(filter))
    }

    recognition.addEventListener("start", handleStartListening)
    recognition.addEventListener("end", handleEndListening)
    recognition.addEventListener("result", handleSpeechResult)

    return () => {
      recognition.removeEventListener("start", handleStartListening)
      recognition.removeEventListener("end", handleEndListening)
      recognition.removeEventListener("result", handleSpeechResult)
    }
  }, [dispatch])

  function handleExportPress() {
    const { users, filter } = store.getState().users
    const data = users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))

    if (data.length === 0) {
      alert("nothing to export")
      return
    }

    const fileName = `users-${Date.now()}`
    const exportType = exportFromJSON.types.xls
    exportFromJSON({ data, fileName, exportType })
  }

  function handleMicPress() {
    recognition.start()
  }

  return (
    <div className="SearchInput__container">
      <div className="SearchInput__input_container">
        <input
          autoFocus
          type="text"
          className="SearchInput__input"
          value={filter}
          onChange={e => {
            dispatch(filterUsers(e.target.value))
          }}
        />
        <BsFillMicFill size={25} style={{ paddingLeft: 12, paddingRight: 12 }} color={activelyListening ? "green" : "black"} onClick={handleMicPress} />
      </div>
      <BsFillPersonPlusFill title="Add" size={25} style={{ padding: 10 }} onClick={handleAddUserClick} />
      <BsFileArrowDown title="export to csv" size={25} style={{ padding: 10 }} onClick={handleExportPress} />
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        >
          clear localStorage
        </button>
      )}
    </div>
  )
}
