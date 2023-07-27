
export const getMessagesES = () => {
    return {
        allDay: 'Todo el dia',
        previous: '<',
        next: '>',
        today: 'hoy',
        month: 'mes',
        week: 'Semana',
        day: 'Dia',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'No hay eventos en este rango',
        showMore: total => ` + Ver mas (${total})`
    };
}
