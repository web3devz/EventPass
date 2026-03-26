module event_pass::pass {
    use std::string::{Self, String};
    use one::event;

    /// NFT ticket owned by holder
    public struct Ticket has key, store {
        id: object::UID,
        event_name: String,
        event_date: String,
        seat: String,
        issuer: address,
        holder: address,
        used: bool,
    }

    public struct TicketIssued has copy, drop {
        event_name: String,
        seat: String,
        holder: address,
        epoch: u64,
    }

    public struct TicketUsed has copy, drop {
        event_name: String,
        holder: address,
        epoch: u64,
    }

    const E_NOT_HOLDER: u64 = 0;
    const E_ALREADY_USED: u64 = 1;

    /// Issue a ticket NFT to a recipient
    public fun issue(
        raw_event_name: vector<u8>,
        raw_event_date: vector<u8>,
        raw_seat: vector<u8>,
        recipient: address,
        ctx: &mut TxContext,
    ) {
        let event_name = string::utf8(raw_event_name);
        let seat = string::utf8(raw_seat);
        let epoch = ctx.epoch();

        event::emit(TicketIssued { event_name, seat, holder: recipient, epoch });

        let ticket = Ticket {
            id: object::new(ctx),
            event_name,
            event_date: string::utf8(raw_event_date),
            seat,
            issuer: ctx.sender(),
            holder: recipient,
            used: false,
        };
        transfer::transfer(ticket, recipient);
    }

    /// Mark ticket as used (check-in)
    public fun check_in(ticket: &mut Ticket, ctx: &mut TxContext) {
        assert!(ticket.holder == ctx.sender(), E_NOT_HOLDER);
        assert!(!ticket.used, E_ALREADY_USED);
        ticket.used = true;
        event::emit(TicketUsed {
            event_name: ticket.event_name,
            holder: ticket.holder,
            epoch: ctx.epoch(),
        });
    }

    /// Burn ticket after use
    public fun burn(ticket: Ticket, ctx: &TxContext) {
        assert!(ticket.holder == ctx.sender(), E_NOT_HOLDER);
        let Ticket { id, event_name: _, event_date: _, seat: _, issuer: _, holder: _, used: _ } = ticket;
        object::delete(id);
    }

    public fun event_name(t: &Ticket): &String { &t.event_name }
    public fun seat(t: &Ticket): &String { &t.seat }
    public fun holder(t: &Ticket): address { t.holder }
    public fun is_used(t: &Ticket): bool { t.used }
}
