const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    

    socket.emit( 'ultimo-ticket', ticketControl.ultimo );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
 
        // Notificar que hay un nuevo tyicket pendiente por asignar

    })
    socket.on('atender-ticket', ({escritorio}, callback)=> {
        if (!escritorio){
            return callback({
                ok:false,
                msg: "el escritorio es obligatorio"
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        //TODO: notificar cambio en los ultimos4

        if (!ticket) { 
            callback({
                ok:false, 
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok:true, 
                ticket
            });
        }
    })

}



module.exports = {
    socketController
}

