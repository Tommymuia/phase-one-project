let toEditId = null;
const API_URL = "http://localhost:3000/tickets";
const ticketForm = document.getElementById("ticketForm");
const searchBox = document.getElementById("searchBox");
const ticketsTable = document.getElementById("ticketsTable");

async function fetchTickets() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderTickets(data);
}

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

             <button onclick="editTicket('${ticket.id}')" class="bg-green-400 text-white px-2 py-1 rounded "> Edit</button>
             <button onclick="deleteTicket('${ticket.id}')" class="bg-red-400 text-white px-2 py-1 rounded"> Delete</button>
             
             
             </td>

             `;

    ticketsTable.appendChild(row);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const ticketData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    ticketCount: parseInt(document.getElementById("ticketCount").value, 10),
  };

  let url = API_URL;
  let method = "POST";

  if (toEditId) {
    url = `${API_URL}/${toEditId}`;
    method = "PUT";
  }

  await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticketData),
  });

  ticketForm.reset();
  toEditId = null;

  const submitButton = ticketForm.querySelector('button[type="submit"]');
  submitButton.textContent = "ADD TICKET";
  submitButton.classList.remove("bg-green-500", "hover:bg-green-600");
  submitButton.classList.add("bg-blue-500", "hover:bg-blue-600");

  fetchTickets();
}

ticketForm.addEventListener("submit", handleFormSubmit);
fetchTickets();

async function deleteTicket(id) {
  const confirmed = confirm(
    "Seriously, are you sure you want to delete the ticket?"
  );
  if (!confirmed) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchTickets();
    } else {
      console.error("Failed to delete tickets:", res.status, res.statusText);
      alert("error: Could not delete ticket");
    }
  } catch (error) {
    console.error("Error during delete operation:", error);
    alert("Network error: Could not reach the server.");
  }
}

async function editTicket(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const ticketToEdit = await res.json();

  document.getElementById("firstName").value = ticketToEdit.firstName;
  document.getElementById("lastName").value = ticketToEdit.lastName;
  document.getElementById("email").value = ticketToEdit.email;
  document.getElementById("ticketCount").value = ticketToEdit.ticketCount;

  toEditId = id;
  const submitButton = ticketForm.querySelector('button[type="submit"]');
  submitButton.textContent = "UPDATE TICKET";
  submitButton.classList.remove("bg-blue-500", "hover:bg-blue-600");
  submitButton.classList.add("bg-green-500", "hover:bg-green-600");
}
