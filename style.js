const API_URL = "http://localhost:3000/tickets";
const forms = document.getElementById("ticketForm");
const searchBox = document.getElementById("searchBox");
const tbody = document.getElementById("ticketsTable");

//fetching data from the Json file

async function fetchTickets() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderTickets(data);
}
//render tickets
function renderTickets(tickets) {
  ticketsTable.innerHTML = "";
  tickets.forEach((ticket) => {
    const row = document.createElement("tr");
    row.classList.add("border-b");
    row.innerHTML = `
        <td class="py-2 px-4"> ${ticket.firstName}</td>
         <td class="py-2 px-4"> ${ticket.lastName}</td>
          <td class="py-2 px-4"> ${ticket.email}</td>
           <td class="py-2 px-4"> ${ticket.ticketCount}</td>
            <td class="py-2 px-4"> ${ticket.action}</td>
             <td class="py-2 px-4" space-x-2>
             <button onclick"editTicket(${ticket.id})" class="bg-green-400 text-white px-2 py-1 rounded "> Edit</button>
             <button onclicl"deleteTicket(${ticket.id})" class="bg-red-400 text-white px-2 py-1 rounded"> Delete</button>
             
             
             </td>
             ;
             ticketsTable.appendChild("row")
             ;`;
  });
}
// adding tickets to the UI
ticketForm.addEventlistener("submit",  async (e) =>{
    e.preventDefault();
    const newTicket={
        firstName:document.getElementById("firstName").value,
        lastName:document.getElementById("lastName").value,
        email:document.getElementById("email").value,
        ticketCount:document.parseInt(getElementById("ticketCount").value, 10)

    }
})
