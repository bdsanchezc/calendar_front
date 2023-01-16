import { useCalendarStore } from '../../hooks'


export const FabButtonDelete = () => {
    const { startDeletingEvent, hasEventActive } = useCalendarStore();

    const onClickDeleteEvent = () => {
        startDeletingEvent();
    }

    return (
        <button 
            className="btn btn-danger fba fba-danger" 
            onClick={onClickDeleteEvent}
            style={{ display: hasEventActive ? 'block' : 'none' }}>
            <i className="fa fa-trash-alt"></i>
        </button>
    )
}
