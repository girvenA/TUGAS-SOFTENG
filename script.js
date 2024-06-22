const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Fungsi untuk menghitung dan memperbarui subtotal
function updateSubtotal() {
    let cartTable = document.getElementById('cartTable');
    let subtotals = cartTable.querySelectorAll('.subtotal');
    let cartSubtotal = 0;

    subtotals.forEach(subtotal => {
        let quantityInput = subtotal.previousElementSibling.querySelector('.quantity');
        let price = parseFloat(subtotal.previousElementSibling.previousElementSibling.dataset.price);
        let quantity = parseInt(quantityInput.value);
        let subtotalValue = price * quantity;
        subtotal.textContent = '$' + subtotalValue.toFixed(2); // Update subtotal
        cartSubtotal += subtotalValue; // Tambahkan ke total subtotal keranjang
    });

    // Update total subtotal keranjang
    document.getElementById('cartSubtotal').textContent = '$' + cartSubtotal.toFixed(2);
    document.getElementById('cartTotal').textContent = '$' + cartSubtotal.toFixed(2);
}

// Event listener untuk perubahan kuantitas
document.addEventListener('DOMContentLoaded', function() {
    let quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateSubtotal);
    });
    updateSubtotal(); // Panggil fungsi awal untuk menghitung subtotal
});

let removeButtons = document.querySelectorAll('.far.fa-times-circle');
removeButtons.forEach(button => {
  button.addEventListener('click', removeItem);
});

function removeItem(event) {
    let row = event.target.closest('tr');
    row.remove();
    updateSubtotal();
  }






