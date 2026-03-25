module event_pass::pass {
    use sui::event;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    public struct Ticket has key, store {
        id: UID,
        event_id: vector<u8>,
        seat: vector<u8>,
        holder: address,
    }

    public struct TicketIssued has copy, drop {
        event_id: vector<u8>,
        holder: address,
    }

    public struct TicketCheckedIn has copy, drop {
        ticket_id: UID,
        holder: address,
    }

    public entry fun issue(
        event_id: vector<u8>,
        seat: vector<u8>,
        recipient: address,
        ctx: &mut TxContext,
    ) {
        let ticket = Ticket {
            id: object::new(ctx),
            event_id: event_id.clone(),
            seat,
            holder: recipient,
        };
        event::emit(TicketIssued { event_id, holder: recipient });
        transfer::transfer(ticket, recipient);
    }

    public entry fun check_in(ticket: Ticket, ctx: &mut TxContext) {
        let holder = tx_context::sender(ctx);
        assert!(holder == ticket.holder, 0);
        event::emit(TicketCheckedIn { ticket_id: ticket.id, holder });
        transfer::transfer(ticket, holder);
    }
}
