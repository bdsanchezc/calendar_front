
export const CalendarEventBox = ({event}) => {
    const { title, user } = event;
    
    return (
        <>
            <strong className="d-block">{title}</strong>
            <small>{user.name}</small>
        </>
    )
}
