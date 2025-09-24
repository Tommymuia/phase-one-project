const API_URL = "http://localhost:3000/tickets";
const ticketForm = document.getElementById("ticketForm");
const searchBox = document.getElementById("searchBox");
const ticketsTable = document.getElementById("ticketsTable");

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
            
             <td class="py-2 px-4 space-x-2">

             <button onclick="editTicket(${ticket.id})" class="bg-green-400 text-white px-2 py-1 rounded "> Edit</button>
             <button onclick="deleteTicket(${ticket.id})" class="bg-red-400 text-white px-2 py-1 rounded"> Delete</button>
             
             
             </td>

             `;

    ticketsTable.appendChild(row);
  });
}
// adding tickets to the UI
async function addTicket(e) {
  e.preventDefault();
  const newTicket = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    ticketCount: parseInt(document.getElementById("ticketCount").value, 10),
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTicket),
  });

  ticketForm.reset();
  fetchTickets();
}

ticketForm.addEventListener("submit", addTicket);
fetchTickets();

