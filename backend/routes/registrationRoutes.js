// // const express = require('express');
// // const router = express.Router();
// // const registrationController = require('../controllers/registrationController');
// // const { verifyToken } = require('../middleware/auth');

// // router.post('/', verifyToken, registrationController.createRegistration);
// // router.get('/', verifyToken, registrationController.getRegistrations);
// // router.get('/:id', verifyToken, registrationController.getRegistration);
// // router.put('/:id', verifyToken, registrationController.updateRegistration);
// // router.post('/:id/register', verifyToken, registrationController.registerFree);
// // router.put('/:id/close', verifyToken, registrationController.closeRegistration);
// // router.delete('/:id', verifyToken, registrationController.deleteRegistration);
// // router.get('/:id/participants', verifyToken, registrationController.getParticipants);
// // router.get('/:id/payments', verifyToken, registrationController.getPayments);

// // module.exports = router;
// const API_BASE_URL = `${window.location.origin}/api`;

// document.addEventListener('DOMContentLoaded', function () {
//     const authForm = document.getElementById('authForm');
//     const registerBtn = document.getElementById('registerBtn');
//     const btnText = document.getElementById('btnText');
//     const spinner = document.getElementById('spinner');
//     const alertDiv = document.getElementById('alert');

//     authForm.addEventListener('submit', async function (e) {
//         e.preventDefault();

//         const name = document.getElementById('name').value.trim();
//         const username = document.getElementById('username').value.trim();
//         const email = document.getElementById('email').value.trim();
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirmPassword').value;

//         // validation
//         if (!name || !username || !email || !password || !confirmPassword) {
//             showAlert('Please fill in all fields', 'error');
//             return;
//         }

//         if (password !== confirmPassword) {
//             showAlert('Passwords do not match', 'error');
//             return;
//         }

//         if (password.length < 6) {
//             showAlert('Password must be at least 6 characters long', 'error');
//             return;
//         }

//         // loading UI
//         registerBtn.disabled = true;
//         btnText.textContent = 'Creating Account...';
//         spinner.style.display = 'block';

//         try {
//             const token = localStorage.getItem('Swe_Society_token');

//             const response = await fetch(`${API_BASE_URL}/registration`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token ? `Bearer ${token}` : ''
//                 },
//                 body: JSON.stringify({
//                     title: name,
//                     description: username,
//                     type: 'free',
//                     fee_amount: null
//                 })
//             });

//             const data = await response.json();

//             if (response.ok && data.success) {
//                 showAlert('Registration successful!', 'success');

//                 setTimeout(() => {
//                     window.location.href = 'login.html';
//                 }, 1500);

//             } else {
//                 showAlert(data.message || 'Registration failed', 'error');
//             }

//         } catch (error) {
//             console.error('Error:', error);
//             showAlert('Network error. Please check backend server.', 'error');
//         } finally {
//             registerBtn.disabled = false;
//             btnText.textContent = 'Create Account';
//             spinner.style.display = 'none';
//         }
//     });

//     function showAlert(message, type) {
//         alertDiv.textContent = message;
//         alertDiv.className = `alert ${type}`;
//         alertDiv.style.display = 'block';

//         setTimeout(() => {
//             alertDiv.style.display = 'none';
//         }, 5000);
//     }
// });
const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { verifyToken } = require('../middleware/auth');

// CREATE
router.post('/', verifyToken, registrationController.createRegistration);

// GET ALL
router.get('/', verifyToken, registrationController.getRegistrations);

// GET ONE
router.get('/:id', verifyToken, registrationController.getRegistration);

// UPDATE
router.put('/:id', verifyToken, registrationController.updateRegistration);

// REGISTER FREE
router.post('/:id/register', verifyToken, registrationController.registerFree);

// CLOSE
router.put('/:id/close', verifyToken, registrationController.closeRegistration);

// DELETE
router.delete('/:id', verifyToken, registrationController.deleteRegistration);

// PARTICIPANTS
router.get('/:id/participants', verifyToken, registrationController.getParticipants);

// PAYMENTS
router.get('/:id/payments', verifyToken, registrationController.getPayments);

module.exports = router;