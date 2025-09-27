const tickets = [
  {
    id: 1001,
    title: "Login Issues - Can't Access Account",
    description: "Customer is unable to log in to their account. They've tried resetting their password multiple times but still...",
    customer: "John Smith",
    priority: "HIGH PRIORITY",
    status: "Open",
    createdAt: "1/15/2024",
  },
  {
    id: 1002,
    title: "Payment Failed - Card Declined",
    description: "Customer attempted to pay using Visa ending 1234 but the payment keeps failing despite sufficient balance.",
    customer: "Sarah Johnson",
    priority: "HIGH PRIORITY",
    status: "Open",
    createdAt: "1/16/2024",
  },
  {
    id: 1003,
    title: "Unable to Download Invoice",
    description: "Customer cannot download their January invoice from the billing section. The download button is...",
    customer: "Michael Brown",
    priority: "MEDIUM PRIORITY",
    status: "In Progress",
    createdAt: "1/17/2024",
  },
  {
    id: 1004,
    title: "Incorrect Billing Address",
    description: "Customer's billing address shows a different city. They updated it but it still displays the old one.",
    customer: "Emily Davis",
    priority: "LOW PRIORITY",
    status: "Open",
    createdAt: "1/18/2024",
  },
  {
    id: 1005,
    title: "App Crash on Launch",
    description:
      "Customer reports that the mobile app crashes immediately upon opening on Android 13.",
    customer: "David Wilson",
    priority: "HIGH PRIORITY",
    status: "Open",
    createdAt: "1/19/2024",
  },
  {
    id: 1006,
    title: "Refund Not Processed",
    description: "Customer requested a refund two weeks ago but has not received the amount yet.",
    customer: "Sophia Taylor",
    priority: "MEDIUM PRIORITY",
    status: "In Progress",
    createdAt: "1/20/2024",
  },
  {
    id: 1007,
    title: "Two-Factor Authentication Issue",
    description: "Customer is not receiving 2FA codes on their registered phone number.",
    customer: "James Anderson",
    priority: "HIGH PRIORITY",
    status: "Open",
    createdAt: "1/21/2024",
  },
  {
    id: 1008,
    title: "Unable to Update Profile Picture",
    description: "Customer tries to upload a new profile picture but gets 'Upload failed' error.",
    customer: "Olivia Martinez",
    priority: "LOW PRIORITY",
    status: "Open",
    createdAt: "1/22/2024",
  },
  {
    id: 1009,
    title: "Subscription Auto-Renewal",
    description: "Customer wants to enable auto-renewal for their subscription but the toggle is disabled.",
    customer: "Liam Thomas",
    priority: "MEDIUM PRIORITY",
    status: "In Progress",
    createdAt: "1/17/2024",
  },
  {
    id: 1010,
    title: "Missing Order Confirmation Email",
    description:
      "Customer placed an order but didn't receive a confirmation email even though payment succeeded.",
    customer: "Isabella Garcia",
    priority: "MEDIUM PRIORITY",
    status: "Open",
    createdAt: "1/24/2024",
  },
];
let tasks = [];
let resolvedTickets = [];

function priorityClass(priority) {
  if (priority === "HIGH PRIORITY") return "priority-high";
  if (priority === "MEDIUM PRIORITY") return "priority-medium";
  return "priority-low";
}

function statusClass(status) {
  if (status === "Open") return "status-open";
  if (status === "In Progress") return "status-inprogress";
  return "status-resolved";
}

function renderTickets() {
  const grid = document.getElementById("ticketGrid");
  grid.innerHTML = "";
  tickets.forEach((ticket) => {
    grid.innerHTML += `
      <div class="ticket-card">
        <div class="ticket-header">
          <span class="ticket-title">${ticket.title}</span>
          <span class="ticket-status ${statusClass(ticket.status)}">${ticket.status === "Open" ? "Open" : "In-Progress"}</span>
        </div>
        <div class="ticket-desc">${ticket.description}</div>
        <div class="ticket-details">
          <span>#${ticket.id}</span>
          <span class="${priorityClass(ticket.priority)}">${ticket.priority}</span>
          <span>${ticket.customer}</span>
          <span>${ticket.createdAt}</span>
        </div>
      </div>
    `;
  });
}

function updateCounts() {
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = resolvedTickets.length;
  document.getElementById("inProgressCount").textContent = inProgressCount;
  document.getElementById("resolvedCount").textContent = resolvedCount;
}

function renderTaskStatus() {
  const ul = document.getElementById("taskStatusList");
  ul.innerHTML = "";
  tasks.forEach((ticket) => {
    ul.innerHTML += `
      <li style="background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.04); border-radius:12px; margin-bottom:18px; padding:24px 18px; display:flex;flex-direction:column;">
        <span style="font-size:1.15rem; font-weight:600; color:#183153; margin-bottom:14px;">${ticket.title}</span>
        <button class="complete-btn" onclick="completeTask(${ticket.id})">Complete</button>
      </li>
    `;
  });
}

function renderResolvedList() {
  const ul = document.getElementById("resolvedList");
  ul.innerHTML = "";
  resolvedTickets.forEach((ticket) => {
    ul.innerHTML += `<li>${ticket.title}</li>`;
  });
}

// Add to task status on ticket card click
document.getElementById("ticketGrid").addEventListener("click", function (event) {
  const card = event.target.closest(".ticket-card");
  if (!card) return;
  const title = card.querySelector(".ticket-title").textContent;
  const ticket = tickets.find((t) => t.title === title);
  if (ticket && ticket.status === "Open" && !tasks.some((t) => t.id === ticket.id)) {
    ticket.status = "In Progress";
    tasks.push(ticket);
    updateCounts();
    renderTickets();
    renderTaskStatus();
    alert(`${ticket.title} added to Task Status!`);
  }
});

// Task completion logic
window.completeTask = function (id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx > -1) {
    const ticket = tasks[idx];
    ticket.status = "Resolved";
    resolvedTickets.push(ticket);
    tasks.splice(idx, 1);
    const ticketIdx = tickets.findIndex((t) => t.id === id);
    if (ticketIdx > -1) tickets.splice(ticketIdx, 1);
    updateCounts();
    renderTickets();
    renderTaskStatus();
    renderResolvedList();
    alert(`${ticket.title} marked as Resolved!`);
  }
};

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('navbarMenu');

  if (!menuBtn || !menu) {
    console.error('Menu button or menu container not found');
    return;
  }

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Close the mobile menu when any menu link or button is clicked
  const menuLinks = document.querySelectorAll('.navbar-right a, .new-ticket-btn');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
});

// Initial render
renderTickets();
updateCounts();
renderTaskStatus();
renderResolvedList();
