import TicketModel from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";

class TicketManager {
    async createTicket(amount, purchaser) {
        try {
            const ticket = await TicketModel.create({
                code: uuidv4(),
                amount,
                purchaser
            });
            return ticket;
        } catch (error) {
            throw new Error("Error al crear el ticket: " + error.message);
        }
    }
}

export default TicketManager;
