
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { StartDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        StartDeletingEvent();
    }

  return (
    <button
        onClick={ handleDelete }
        className="btn btn-danger fab-danger"
        style={{
            display: hasEventSelected ? '': 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
