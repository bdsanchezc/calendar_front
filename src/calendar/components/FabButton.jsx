import { addHours } from 'date-fns';
import { useUiStore, useCalendarStore } from '../../hooks'


export const FabButton = () => {

    const { openDateModal } = useUiStore();
    const { onSelectEventActive } = useCalendarStore();

    const onClickNewEvent = () => {
        onSelectEventActive({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#352daf',
            user: {
                id: '123',
                name: 'Bryan Sanchez'
            }
        })
        openDateModal();
    }

    return (
        <button className="btn btn-primary fba" onClick={onClickNewEvent}>
            <i className="fa fa-plus"></i>
        </button>
    )
}
