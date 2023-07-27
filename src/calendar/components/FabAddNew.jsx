import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const {openDateModal} = useUiStore();
     const {setActiveEvent} = useCalendarStore();

    const hanldeClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
            _id: '123',
            name: 'Isaac'
            }
        });
        openDateModal();
    }

  return (
    <button
    onClick={ hanldeClickNew }
        className="btn btn-primary fab"
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
