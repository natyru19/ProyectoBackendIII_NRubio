import TicketManager from "../dao/managers/ticket.manager.js";

const ticketManager = new TicketManager();

const createTicket = async (amount, purchaser) => {
    return await ticketManager.createTicket(amount, purchaser);
};

export default { createTicket };