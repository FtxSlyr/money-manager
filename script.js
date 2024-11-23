// DOM Elements
const balanceElement = document.getElementById('balance');
const historyContainer = document.getElementById('history-container');
const incomeButton = document.getElementById('income-button');
const expenseButton = document.getElementById('expense-button');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');

// Initialize data
let balance = parseInt(localStorage.getItem('balance')) || 0;
let history = JSON.parse(localStorage.getItem('history')) || [];

// Format number with dots (e.g., Rp. 1.000)
function formatCurrency(amount) {
    return amount.toLocaleString('id-ID');
}

// Update balance display
function updateBalance() {
    balanceElement.textContent = `Rp. ${formatCurrency(balance)}`;
    localStorage.setItem('balance', balance); // Save to localStorage
}

// Render transaction history
function renderHistory() {
    historyContainer.innerHTML = ''; // Clear existing history
    history.slice().reverse().forEach((transaction) => {  // Sort newest to oldest
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item', transaction.type);
        historyItem.innerHTML = `
            <div class="type">${transaction.type === 'income' ? 'Income' : 'Expense'}</div>
            <div>Amount: Rp. ${formatCurrency(transaction.amount)}</div>
            <div>Description: ${transaction.description}</div>
        `;
        historyContainer.appendChild(historyItem);
    });
    localStorage.setItem('history', JSON.stringify(history)); // Save to localStorage
}

// Add transaction
function addTransaction(type) {
    const amount = parseInt(amountInput.value);
    const description = descriptionInput.value;

    if (!amount || !description) {
        alert('Please fill in all fields!');
        return;
    }

    if (type === 'income') {
        balance += amount;
    } else if (type === 'expense') {
        balance -= amount;
    }

    history.push({ type, amount, description });
    updateBalance();
    renderHistory();

    // Clear form inputs
    amountInput.value = '';
    descriptionInput.value = '';
}

// Event Listeners
incomeButton.addEventListener('click', () => addTransaction('income'));
expenseButton.addEventListener('click', () => addTransaction('expense'));

// Initial load
updateBalance();
renderHistory();
