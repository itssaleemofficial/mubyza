// Salon Management System JavaScript
class SalonManagementSystem {
    constructor() {
        this.currentPage = 'dashboard';
        this.appointments = [];
        this.clients = [];
        this.staff = [];
        this.services = [];
        this.products = [];
        this.cart = [];
        this.init();
    }

    init() {
        this.initializeData();
        this.setupEventListeners();
        this.renderDashboard();
        this.setupCalendar();
    }

    initializeData() {
        // Sample data
        this.clients = [
            { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '(555) 123-4567', visits: 12, lastVisit: '2026-02-01', status: 'active' },
            { id: 2, name: 'Maria Garcia', email: 'maria@email.com', phone: '(555) 234-5678', visits: 8, lastVisit: '2026-01-28', status: 'active' },
            { id: 3, name: 'Jennifer Smith', email: 'jennifer@email.com', phone: '(555) 345-6789', visits: 15, lastVisit: '2026-02-02', status: 'active' },
            { id: 4, name: 'Emily Brown', email: 'emily@email.com', phone: '(555) 456-7890', visits: 3, lastVisit: '2026-01-15', status: 'new' },
            { id: 5, name: 'Amanda Davis', email: 'amanda@email.com', phone: '(555) 567-8901', visits: 20, lastVisit: '2026-01-30', status: 'active' }
        ];

        this.staff = [
            { id: 1, name: 'Emma Wilson', role: 'Senior Stylist', specialties: ['Hair Color', 'Cutting'], schedule: 'Mon-Fri 9-6', commission: 0.3 },
            { id: 2, name: 'Lisa Chen', role: 'Nail Technician', specialties: ['Manicure', 'Pedicure'], schedule: 'Tue-Sat 10-7', commission: 0.25 },
            { id: 3, name: 'Anna Davis', role: 'Esthetician', specialties: ['Facials', 'Waxing'], schedule: 'Mon-Fri 9-5', commission: 0.35 },
            { id: 4, name: 'Michael Brown', role: 'Massage Therapist', specialties: ['Swedish', 'Deep Tissue'], schedule: 'Wed-Sun 10-8', commission: 0.4 }
        ];

        this.services = [
            { id: 1, name: 'Hair Cut', category: 'Hair', price: 45, duration: 30, description: 'Professional hair cut and styling' },
            { id: 2, name: 'Hair Color', category: 'Hair', price: 120, duration: 120, description: 'Full hair color service' },
            { id: 3, name: 'Highlights', category: 'Hair', price: 150, duration: 150, description: 'Partial or full highlights' },
            { id: 4, name: 'Manicure', category: 'Nails', price: 35, duration: 45, description: 'Classic manicure with polish' },
            { id: 5, name: 'Pedicure', category: 'Nails', price: 50, duration: 60, description: 'Relaxing pedicure service' },
            { id: 6, name: 'Facial Treatment', category: 'Beauty', price: 80, duration: 60, description: 'Rejuvenating facial treatment' },
            { id: 7, name: 'Massage', category: 'Wellness', price: 100, duration: 60, description: 'Full body massage' }
        ];

        this.products = [
            { id: 1, name: 'Shampoo', category: 'Hair Care', price: 25, stock: 15, minStock: 5, supplier: 'Beauty Supply Co.' },
            { id: 2, name: 'Conditioner', category: 'Hair Care', price: 25, stock: 12, minStock: 5, supplier: 'Beauty Supply Co.' },
            { id: 3, name: 'Hair Color Kit', category: 'Hair Color', price: 45, stock: 3, minStock: 5, supplier: 'Professional Colors' },
            { id: 4, name: 'Nail Polish', category: 'Nails', price: 15, stock: 25, minStock: 10, supplier: 'Nail Pro' },
            { id: 5, name: 'Face Cream', category: 'Skincare', price: 55, stock: 8, minStock: 5, supplier: 'Skincare Inc.' },
            { id: 6, name: 'Massage Oil', category: 'Wellness', price: 30, stock: 2, minStock: 5, supplier: 'Wellness Supplies' }
        ];

        // Generate sample appointments
        this.generateSampleAppointments();
    }

    generateSampleAppointments() {
        const today = new Date();
        for (let i = 0; i < 5; i++) {
            const appointmentDate = new Date(today);
            appointmentDate.setDate(today.getDate() + i);
            
            this.appointments.push({
                id: i + 1,
                clientId: this.clients[i % this.clients.length].id,
                staffId: this.staff[i % this.staff.length].id,
                serviceId: this.services[i % this.services.length].id,
                date: appointmentDate.toISOString().split('T')[0],
                time: `${9 + i * 2}:00`,
                status: i === 0 ? 'completed' : 'scheduled',
                notes: 'Regular client'
            });
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Mobile menu toggle
        document.querySelector('.menu-toggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('active');
        });

        // New appointment button
        document.getElementById('new-appointment-btn').addEventListener('click', () => {
            this.showAppointmentModal();
        });

        // New client button
        document.getElementById('new-client-btn').addEventListener('click', () => {
            this.showClientModal();
        });

        // Add staff button
        document.getElementById('add-staff-btn').addEventListener('click', () => {
            this.showStaffModal();
        });

        // Add service button
        document.getElementById('add-service-btn').addEventListener('click', () => {
            this.showServiceModal();
        });

        // Add product button
        document.getElementById('add-product-btn').addEventListener('click', () => {
            this.showProductModal();
        });

        // Search functionality
        document.querySelector('.search-bar input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    navigateToPage(page) {
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.style.display = 'none';
        });

        // Show selected page
        const selectedPage = document.getElementById(`${page}-page`);
        if (selectedPage) {
            selectedPage.style.display = 'block';
        }

        // Update page title
        const pageTitle = document.getElementById('page-title');
        pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);

        // Render page content
        this.renderPage(page);
        this.currentPage = page;
    }

    renderPage(page) {
        switch(page) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'reception':
                this.renderReception();
                break;
            case 'scheduler':
                this.renderScheduler();
                break;
            case 'appointments':
                this.renderAppointments();
                break;
            case 'clients':
                this.renderClients();
                break;
            case 'staff':
                this.renderStaff();
                break;
            case 'services':
                this.renderServices();
                break;
            case 'inventory':
                this.renderInventory();
                break;
            case 'pos':
                this.renderPOS();
                break;
            case 'reports':
                this.renderReports();
                break;
        }
    }

    renderDashboard() {
        // Update stats with real data
        const todayAppointments = this.appointments.filter(apt => 
            apt.date === new Date().toISOString().split('T')[0]
        ).length;

        document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = todayAppointments;
        
        // Dashboard is already rendered in HTML, but we could update it dynamically here
    }

    renderAppointments() {
        // Calendar functionality is handled separately
    }

    renderClients() {
        const clientsList = document.getElementById('clients-list');
        clientsList.innerHTML = '';

        this.clients.forEach(client => {
            const clientCard = document.createElement('div');
            clientCard.className = 'client-card';
            clientCard.innerHTML = `
                <img src="https://picsum.photos/seed/client${client.id}/50/50.jpg" alt="${client.name}">
                <div class="client-details">
                    <h4>${client.name}</h4>
                    <p>${client.email}</p>
                    <p>Visits: ${client.visits} | Last: ${client.lastVisit}</p>
                </div>
                <div class="client-actions">
                    <button class="btn btn-secondary" onclick="salonSystem.editClient(${client.id})">Edit</button>
                </div>
            `;
            clientsList.appendChild(clientCard);
        });
    }

    renderStaff() {
        const staffList = document.getElementById('staff-list');
        staffList.innerHTML = '';

        this.staff.forEach(member => {
            const staffCard = document.createElement('div');
            staffCard.className = 'staff-card';
            staffCard.innerHTML = `
                <div class="staff-info">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                    <p>Specialties: ${member.specialties.join(', ')}</p>
                    <p>Schedule: ${member.schedule}</p>
                    <p>Commission: ${(member.commission * 100).toFixed(0)}%</p>
                </div>
                <div class="staff-actions">
                    <button class="btn btn-secondary" onclick="salonSystem.editStaff(${member.id})">Edit</button>
                </div>
            `;
            staffList.appendChild(staffCard);
        });
    }

    renderServices() {
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = '';

        this.services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-info">
                    <h3>${service.name}</h3>
                    <p>${service.category}</p>
                    <p>${service.description}</p>
                    <p>Duration: ${service.duration} min</p>
                    <p class="price">$${service.price}</p>
                </div>
                <div class="service-actions">
                    <button class="btn btn-secondary" onclick="salonSystem.editService(${service.id})">Edit</button>
                </div>
            `;
            servicesList.appendChild(serviceCard);
        });
    }

    renderInventory() {
        const productsList = document.getElementById('products-list');
        productsList.innerHTML = '';

        this.products.forEach(product => {
            const stockStatus = product.stock <= product.minStock ? 'low-stock' : 'in-stock';
            const productCard = document.createElement('div');
            productCard.className = `product-card ${stockStatus}`;
            productCard.innerHTML = `
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <p>Supplier: ${product.supplier}</p>
                    <p>Stock: ${product.stock} (Min: ${product.minStock})</p>
                    <p class="price">$${product.price}</p>
                </div>
                <div class="product-actions">
                    <button class="btn btn-secondary" onclick="salonSystem.editProduct(${product.id})">Edit</button>
                    ${product.stock <= product.minStock ? '<button class="btn btn-primary">Reorder</button>' : ''}
                </div>
            `;
            productsList.appendChild(productCard);
        });
    }

    renderPOS() {
        const posItems = document.getElementById('pos-items');
        posItems.innerHTML = '';

        // Combine services and products for POS
        const allItems = [...this.services, ...this.products];
        
        allItems.forEach(item => {
            const posItem = document.createElement('div');
            posItem.className = 'pos-item';
            posItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            `;
            posItem.addEventListener('click', () => this.addToCart(item));
            posItems.appendChild(posItem);
        });
    }

    renderReports() {
        // Placeholder for reports rendering
        // In a real application, this would generate charts and analytics
    }

    setupCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        const currentMonth = document.getElementById('current-month');
        
        if (!calendarGrid || !currentMonth) return;

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        
        currentMonth.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Clear existing calendar days (except headers)
        const existingDays = calendarGrid.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Check if there are appointments for this day
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayAppointments = this.appointments.filter(apt => apt.date === dateStr);
            
            if (dayAppointments.length > 0) {
                dayElement.classList.add('has-appointments');
                dayElement.innerHTML += `<span class="appointment-count">${dayAppointments.length}</span>`;
            }
            
            // Highlight today
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            dayElement.addEventListener('click', () => this.showDayAppointments(dateStr));
            calendarGrid.appendChild(dayElement);
        }
    }

    showDayAppointments(date) {
        const dayAppointments = this.appointments.filter(apt => apt.date === date);
        console.log('Appointments for', date, ':', dayAppointments);
        // In a real application, this would show a modal with the day's appointments
    }

    addToCart(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
        
        this.updateCart();
    }

    updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems || !cartTotal) return;

        cartItems.innerHTML = '';
        let total = 0;

        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div>
                    <button class="btn btn-secondary" onclick="salonSystem.removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCart();
    }

    showAppointmentModal() {
        const modal = this.createModal('New Appointment', this.getAppointmentForm());
        document.getElementById('modal-container').appendChild(modal);
        modal.classList.add('active');
    }

    showClientModal() {
        const modal = this.createModal('Add Client', this.getClientForm());
        document.getElementById('modal-container').appendChild(modal);
        modal.classList.add('active');
    }

    showStaffModal() {
        const modal = this.createModal('Add Staff Member', this.getStaffForm());
        document.getElementById('modal-container').appendChild(modal);
        modal.classList.add('active');
    }

    showServiceModal() {
        const modal = this.createModal('Add Service', this.getServiceForm());
        document.getElementById('modal-container').appendChild(modal);
        modal.classList.add('active');
    }

    showProductModal() {
        const modal = this.createModal('Add Product', this.getProductForm());
        document.getElementById('modal-container').appendChild(modal);
        modal.classList.add('active');
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        // Close modal functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        return modal;
    }

    getAppointmentForm() {
        return `
            <form id="appointment-form">
                <div class="form-group">
                    <label>Client</label>
                    <select class="form-input" required>
                        <option value="">Select Client</option>
                        ${this.clients.map(client => `<option value="${client.id}">${client.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Service</label>
                    <select class="form-input" required>
                        <option value="">Select Service</option>
                        ${this.services.map(service => `<option value="${service.id}">${service.name} - $${service.price}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Staff</label>
                    <select class="form-input" required>
                        <option value="">Select Staff</option>
                        ${this.staff.map(member => `<option value="${member.id}">${member.name} - ${member.role}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Time</label>
                    <input type="time" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea class="form-input" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Create Appointment</button>
            </form>
        `;
    }

    getClientForm() {
        return `
            <form id="client-form">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-input">
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea class="form-input" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Client</button>
            </form>
        `;
    }

    getStaffForm() {
        return `
            <form id="staff-form">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Commission Rate (%)</label>
                    <input type="number" class="form-input" min="0" max="100" step="0.1" required>
                </div>
                <button type="submit" class="btn btn-primary">Add Staff</button>
            </form>
        `;
    }

    getServiceForm() {
        return `
            <form id="service-form">
                <div class="form-group">
                    <label>Service Name</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select class="form-input" required>
                        <option value="">Select Category</option>
                        <option value="Hair">Hair</option>
                        <option value="Nails">Nails</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Wellness">Wellness</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Price ($)</label>
                    <input type="number" class="form-input" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" class="form-input" min="0" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-input" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Service</button>
            </form>
        `;
    }

    getProductForm() {
        return `
            <form id="product-form">
                <div class="form-group">
                    <label>Product Name</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select class="form-input" required>
                        <option value="">Select Category</option>
                        <option value="Hair Care">Hair Care</option>
                        <option value="Hair Color">Hair Color</option>
                        <option value="Nails">Nails</option>
                        <option value="Skincare">Skincare</option>
                        <option value="Wellness">Wellness</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Price ($)</label>
                    <input type="number" class="form-input" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Initial Stock</label>
                    <input type="number" class="form-input" min="0" required>
                </div>
                <div class="form-group">
                    <label>Minimum Stock</label>
                    <input type="number" class="form-input" min="0" required>
                </div>
                <div class="form-group">
                    <label>Supplier</label>
                    <input type="text" class="form-input" required>
                </div>
                <button type="submit" class="btn btn-primary">Add Product</button>
            </form>
        `;
    }

    handleSearch(query) {
        if (!query) return;
        
        // Simple search implementation
        const results = {
            clients: this.clients.filter(client => 
                client.name.toLowerCase().includes(query.toLowerCase()) ||
                client.email.toLowerCase().includes(query.toLowerCase())
            ),
            appointments: this.appointments.filter(apt => {
                const client = this.clients.find(c => c.id === apt.clientId);
                return client && client.name.toLowerCase().includes(query.toLowerCase());
            })
        };

        console.log('Search results:', results);
        // In a real application, this would display search results
    }

    editClient(id) {
        console.log('Edit client:', id);
        // Implementation for editing client
    }

    editStaff(id) {
        console.log('Edit staff:', id);
        // Implementation for editing staff
    }

    editService(id) {
        console.log('Edit service:', id);
        // Implementation for editing service
    }

    editProduct(id) {
        console.log('Edit product:', id);
        // Implementation for editing product
    }

    // Reception Page Functions
    renderReception() {
        this.setupReceptionNavigation();
        this.updateReceptionStats();
    }

    setupReceptionNavigation() {
        // Add click handlers to reception items
        document.querySelectorAll('.reception-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                if (page) {
                    this.navigateToReceptionSubPage(page);
                }
            });
        });
    }

    navigateToReceptionSubPage(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.style.display = 'none';
        });

        // Show selected sub-page
        const subPage = document.getElementById(`${page}-page`);
        if (subPage) {
            subPage.style.display = 'block';
            this.renderReceptionSubPage(page);
        }

        // Update page title
        const pageTitle = document.getElementById('page-title');
        pageTitle.textContent = page.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    renderReceptionSubPage(page) {
        switch(page) {
            case 'today-invoices':
                this.renderTodayInvoices();
                break;
            case 'today-vouchers':
                this.renderTodayVouchers();
                break;
            case 'recovery':
                this.renderRecovery();
                break;
            case 'pending-orders':
                this.renderPendingOrders();
                break;
            case 'daily-expenses':
                this.renderDailyExpenses();
                break;
            case 'package-invo':
                this.renderPackageInvo();
                break;
            case 'reception-appointments':
                this.renderReceptionAppointments();
                break;
            case 'bookings':
                this.renderBookings();
                break;
            case 'daily-sheet':
                this.renderDailySheet();
                break;
            case 'daily-summary':
                this.renderDailySummary();
                break;
            case 'staff-days':
                this.renderStaffDays();
                break;
            case 'business':
                this.renderBusiness();
                break;
            case 'price-list':
                this.renderPriceList();
                break;
            case 'product-list':
                this.renderProductList();
                break;
            case 'un-invoiced-visits':
                this.renderUnInvoicedVisits();
                break;
            case 'pos-retail':
                this.renderPOSRetail();
                break;
            case 'pos-services':
                this.renderPOSServices();
                break;
            case 'staff-performance':
                this.renderStaffPerformance();
                break;
            case 'eyelashes-records':
                this.renderEyelashesRecords();
                break;
            case 'facial-records':
                this.renderFacialRecords();
                break;
            case 'color-records':
                this.renderColorRecords();
                break;
            case 'dispatch-notes':
                this.renderDispatchNotes();
                break;
            case 'receiving-notes':
                this.renderReceivingNotes();
                break;
            case 'period-bookings':
                this.renderPeriodBookings();
                break;
            case 'agent-wise-bookings':
                this.renderAgentWiseBookings();
                break;
        }
    }

    updateReceptionStats() {
        // Update reception statistics with real data
        const todayAppointments = this.appointments.filter(apt => 
            apt.date === new Date().toISOString().split('T')[0]
        ).length;

        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 3) {
            statValues[0].textContent = todayAppointments;
            statValues[1].textContent = '5'; // Pending orders
            statValues[2].textContent = '$1,245'; // Today's revenue
        }
    }

    renderTodayInvoices() {
        const tbody = document.getElementById('invoices-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        // Sample invoice data
        const invoices = [
            { id: 'INV001', client: 'Sarah Johnson', services: 'Hair Color, Cut', amount: 165, status: 'paid', time: '9:30 AM' },
            { id: 'INV002', client: 'Maria Garcia', services: 'Manicure', amount: 35, status: 'paid', time: '10:15 AM' },
            { id: 'INV003', client: 'Jennifer Smith', services: 'Facial', amount: 80, status: 'pending', time: '11:00 AM' },
            { id: 'INV004', client: 'Emily Brown', services: 'Hair Cut', amount: 45, status: 'paid', time: '2:00 PM' },
            { id: 'INV005', client: 'Amanda Davis', services: 'Highlights', amount: 150, status: 'paid', time: '3:30 PM' }
        ];

        invoices.forEach(invoice => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${invoice.id}</td>
                <td>${invoice.client}</td>
                <td>${invoice.services}</td>
                <td>$${invoice.amount}</td>
                <td><span class="status-badge ${invoice.status}">${invoice.status}</span></td>
                <td>${invoice.time}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="salonSystem.viewInvoice('${invoice.id}')">View</button>
                    <button class="btn btn-sm btn-primary" onclick="salonSystem.printInvoice('${invoice.id}')">Print</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderTodayVouchers() {
        const tbody = document.getElementById('vouchers-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const vouchers = [
            { id: 'VOU001', client: 'Sarah Johnson', type: 'Gift', value: 100, status: 'active', expiry: '2026-06-30' },
            { id: 'VOU002', client: 'Maria Garcia', type: 'Discount', value: 25, status: 'redeemed', expiry: '2026-03-31' },
            { id: 'VOU003', client: 'Jennifer Smith', type: 'Gift', value: 50, status: 'active', expiry: '2026-08-31' },
            { id: 'VOU004', client: 'Emily Brown', type: 'Loyalty', value: 15, status: 'active', expiry: '2026-04-30' },
            { id: 'VOU005', client: 'Amanda Davis', type: 'Referral', value: 30, status: 'redeemed', expiry: '2026-05-31' }
        ];

        vouchers.forEach(voucher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${voucher.id}</td>
                <td>${voucher.client}</td>
                <td>${voucher.type}</td>
                <td>$${voucher.value}</td>
                <td><span class="status-badge ${voucher.status}">${voucher.status}</span></td>
                <td>${voucher.expiry}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="salonSystem.viewVoucher('${voucher.id}')">View</button>
                    <button class="btn btn-sm btn-primary" onclick="salonSystem.redeemVoucher('${voucher.id}')">Redeem</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderRecovery() {
        const recoveryList = document.querySelector('.recovery-list');
        if (!recoveryList) return;

        recoveryList.innerHTML = '';
        
        const recoveryItems = [
            { client: 'John Doe', amount: 250, overdue: 15, invoice: 'INV006' },
            { client: 'Jane Smith', amount: 180, overdue: 8, invoice: 'INV007' },
            { client: 'Bob Johnson', amount: 320, overdue: 22, invoice: 'INV008' }
        ];

        recoveryItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'recovery-item';
            itemDiv.innerHTML = `
                <div class="recovery-info">
                    <h4>${item.client}</h4>
                    <p>Invoice: ${item.invoice}</p>
                    <p>Amount: $${item.amount}</p>
                    <p>Overdue: ${item.overdue} days</p>
                </div>
                <div class="recovery-actions">
                    <button class="btn btn-primary">Contact</button>
                    <button class="btn btn-secondary">Send Reminder</button>
                </div>
            `;
            recoveryList.appendChild(itemDiv);
        });
    }

    renderPendingOrders() {
        const ordersGrid = document.getElementById('orders-grid');
        if (!ordersGrid) return;

        ordersGrid.innerHTML = '';
        
        const orders = [
            { id: 'ORD001', client: 'Sarah Johnson', items: 'Hair Color Kit x2', total: 90, status: 'processing' },
            { id: 'ORD002', client: 'Maria Garcia', items: 'Shampoo & Conditioner', total: 50, status: 'pending' },
            { id: 'ORD003', client: 'Jennifer Smith', items: 'Face Cream', total: 55, status: 'ready' }
        ];

        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.innerHTML = `
                <div class="order-header">
                    <h4>${order.id}</h4>
                    <span class="status-badge ${order.status}">${order.status}</span>
                </div>
                <div class="order-details">
                    <p><strong>Client:</strong> ${order.client}</p>
                    <p><strong>Items:</strong> ${order.items}</p>
                    <p><strong>Total:</strong> $${order.total}</p>
                </div>
                <div class="order-actions">
                    <button class="btn btn-primary">Process</button>
                    <button class="btn btn-secondary">View Details</button>
                </div>
            `;
            ordersGrid.appendChild(orderCard);
        });
    }

    renderDailyExpenses() {
        const tbody = document.getElementById('expenses-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const expenses = [
            { description: 'Office Supplies', category: 'Administrative', amount: 45.50, time: '9:15 AM' },
            { description: 'Utilities', category: 'Operational', amount: 120.00, time: '10:00 AM' },
            { description: 'Cleaning Service', category: 'Operational', amount: 80.00, time: '2:30 PM' }
        ];

        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.description}</td>
                <td>${expense.category}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.time}</td>
                <td>
                    <button class="btn btn-sm btn-secondary">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderPackageInvo() {
        const packagesGrid = document.getElementById('packages-grid');
        if (!packagesGrid) return;

        packagesGrid.innerHTML = '';
        
        const packages = [
            { name: 'Hair Care Package', services: 'Cut + Color + Treatment', price: 200, clients: 15 },
            { name: 'Beauty Package', services: 'Facial + Manicure', price: 120, clients: 8 },
            { name: 'Wellness Package', services: 'Massage + Facial', price: 150, clients: 12 }
        ];

        packages.forEach(pkg => {
            const packageCard = document.createElement('div');
            packageCard.className = 'package-card';
            packageCard.innerHTML = `
                <div class="package-info">
                    <h4>${pkg.name}</h4>
                    <p>${pkg.services}</p>
                    <p class="price">$${pkg.price}</p>
                    <p>${pkg.clients} clients purchased</p>
                </div>
                <div class="package-actions">
                    <button class="btn btn-primary">Sell Package</button>
                    <button class="btn btn-secondary">Edit</button>
                </div>
            `;
            packagesGrid.appendChild(packageCard);
        });
    }

    renderReceptionAppointments() {
        const appointmentsList = document.getElementById('reception-appointments-list');
        if (!appointmentsList) return;

        appointmentsList.innerHTML = '';
        
        const todayAppointments = this.appointments.filter(apt => 
            apt.date === new Date().toISOString().split('T')[0]
        );

        todayAppointments.forEach(apt => {
            const client = this.clients.find(c => c.id === apt.clientId);
            const service = this.services.find(s => s.id === apt.serviceId);
            const staff = this.staff.find(s => s.id === apt.staffId);

            const appointmentDiv = document.createElement('div');
            appointmentDiv.className = 'appointment-item';
            appointmentDiv.innerHTML = `
                <div class="appointment-time">${apt.time}</div>
                <div class="appointment-details">
                    <h4>${client ? client.name : 'Unknown Client'}</h4>
                    <p>${service ? service.name : 'Unknown Service'}</p>
                    <p>Staff: ${staff ? staff.name : 'Unassigned'}</p>
                </div>
                <div class="appointment-status">
                    <span class="status-badge ${apt.status}">${apt.status}</span>
                </div>
            `;
            appointmentsList.appendChild(appointmentDiv);
        });
    }

    renderBookings() {
        const tbody = document.getElementById('bookings-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const bookings = [
            { id: 'BK001', client: 'Sarah Johnson', service: 'Hair Color', date: '2026-02-06', time: '2:00 PM', status: 'confirmed' },
            { id: 'BK002', client: 'Maria Garcia', service: 'Manicure', date: '2026-02-07', time: '10:00 AM', status: 'tentative' },
            { id: 'BK003', client: 'Jennifer Smith', service: 'Facial', date: '2026-02-08', time: '3:00 PM', status: 'confirmed' }
        ];

        bookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.client}</td>
                <td>${booking.service}</td>
                <td>${booking.date}</td>
                <td>${booking.time}</td>
                <td><span class="status-badge ${booking.status}">${booking.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary">Confirm</button>
                    <button class="btn btn-sm btn-secondary">Edit</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderDailySheet() {
        const tbody = document.getElementById('sheet-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const todayAppointments = this.appointments.filter(apt => 
            apt.date === new Date().toISOString().split('T')[0]
        );

        todayAppointments.forEach(apt => {
            const client = this.clients.find(c => c.id === apt.clientId);
            const service = this.services.find(s => s.id === apt.serviceId);
            const staff = this.staff.find(s => s.id === apt.staffId);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${apt.time}</td>
                <td>${client ? client.name : 'Unknown'}</td>
                <td>${service ? service.name : 'Unknown'}</td>
                <td>${staff ? staff.name : 'Unassigned'}</td>
                <td><span class="status-badge ${apt.status}">${apt.status}</span></td>
                <td>$${service ? service.price : 0}</td>
            `;
            tbody.appendChild(row);
        });
    }

    renderDailySummary() {
        // Update summary cards with real data
        const summaryNumbers = document.querySelectorAll('.summary-number');
        if (summaryNumbers.length >= 4) {
            const todayAppointments = this.appointments.filter(apt => 
                apt.date === new Date().toISOString().split('T')[0]
            );
            
            const totalRevenue = todayAppointments.reduce((sum, apt) => {
                const service = this.services.find(s => s.id === apt.serviceId);
                return sum + (service ? service.price : 0);
            }, 0);

            summaryNumbers[0].textContent = `$${totalRevenue}`;
            summaryNumbers[1].textContent = todayAppointments.length;
            summaryNumbers[2].textContent = '3'; // New clients
            summaryNumbers[3].textContent = '8'; // Products sold
        }
    }

    renderStaffDays() {
        const staffScheduleGrid = document.getElementById('staff-schedule-grid');
        if (!staffScheduleGrid) return;

        staffScheduleGrid.innerHTML = '';
        
        this.staff.forEach(member => {
            const todayAppointments = this.appointments.filter(apt => 
                apt.staffId === member.id && apt.date === new Date().toISOString().split('T')[0]
            );

            const scheduleCard = document.createElement('div');
            scheduleCard.className = 'staff-schedule-card';
            scheduleCard.innerHTML = `
                <div class="staff-schedule-header">
                    <h4>${member.name}</h4>
                    <span class="staff-role">${member.role}</span>
                </div>
                <div class="staff-schedule-stats">
                    <p>Today's Appointments: ${todayAppointments.length}</p>
                    <p>Available: ${member.schedule}</p>
                </div>
                <div class="staff-schedule-actions">
                    <button class="btn btn-primary">View Schedule</button>
                    <button class="btn btn-secondary">Add Appointment</button>
                </div>
            `;
            staffScheduleGrid.appendChild(scheduleCard);
        });
    }

    renderBusiness() {
        // Update business metrics with real data
        const metricNumbers = document.querySelectorAll('.metric-number');
        if (metricNumbers.length >= 4) {
            const totalRevenue = this.appointments.reduce((sum, apt) => {
                const service = this.services.find(s => s.id === apt.serviceId);
                return sum + (service ? service.price : 0);
            }, 0);

            metricNumbers[0].textContent = `$${totalRevenue}`;
            metricNumbers[1].textContent = this.clients.length;
            metricNumbers[2].textContent = '78%'; // Occupancy rate
            metricNumbers[3].textContent = '$58'; // Average transaction
        }
    }

    renderPriceList() {
        const tbody = document.getElementById('price-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        this.services.forEach(service => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${service.name}</td>
                <td>${service.category}</td>
                <td>${service.duration} min</td>
                <td>$${service.price}</td>
                <td>2026-01-15</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="salonSystem.editServicePrice(${service.id})">Edit</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderProductList() {
        const tbody = document.getElementById('products-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td>$${product.price}</td>
                <td>${product.supplier}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="salonSystem.editProduct(${product.id})">Edit</button>
                    <button class="btn btn-sm btn-primary">Order</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderUnInvoicedVisits() {
        const tbody = document.getElementById('un-invoiced-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        // Sample un-invoiced visits
        const unInvoicedVisits = [
            { date: '2026-01-30', client: 'John Doe', services: 'Hair Cut', staff: 'Emma Wilson', amount: 45, daysOverdue: 7 },
            { date: '2026-02-01', client: 'Jane Smith', services: 'Manicure', staff: 'Lisa Chen', amount: 35, daysOverdue: 5 },
            { date: '2026-02-02', client: 'Bob Johnson', services: 'Facial', staff: 'Anna Davis', amount: 80, daysOverdue: 4 }
        ];

        unInvoicedVisits.forEach(visit => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${visit.date}</td>
                <td>${visit.client}</td>
                <td>${visit.services}</td>
                <td>${visit.staff}</td>
                <td>$${visit.amount}</td>
                <td>${visit.daysOverdue}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="salonSystem.createInvoice('${visit.client}', ${visit.amount})">Create Invoice</button>
                    <button class="btn btn-sm btn-secondary">View Details</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderPOSRetail() {
        const posProductsGrid = document.getElementById('pos-retail-products');
        if (!posProductsGrid) return;

        posProductsGrid.innerHTML = '';
        
        this.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'pos-product-card';
            productCard.innerHTML = `
                <h4>${product.name}</h4>
                <p>${product.category}</p>
                <p class="price">$${product.price}</p>
                <p>Stock: ${product.stock}</p>
            `;
            productCard.addEventListener('click', () => this.addToRetailCart(product));
            posProductsGrid.appendChild(productCard);
        });
    }

    renderPOSServices() {
        const posServicesGrid = document.getElementById('pos-services-grid');
        if (!posServicesGrid) return;

        posServicesGrid.innerHTML = '';
        
        this.services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'pos-service-card';
            serviceCard.innerHTML = `
                <h4>${service.name}</h4>
                <p>${service.category}</p>
                <p class="price">$${service.price}</p>
                <p>${service.duration} min</p>
            `;
            serviceCard.addEventListener('click', () => this.addToServiceCart(service));
            posServicesGrid.appendChild(serviceCard);
        });
    }

    renderStaffPerformance() {
        const performanceGrid = document.getElementById('performance-grid');
        const tbody = document.getElementById('performance-tbody');
        
        if (performanceGrid) {
            performanceGrid.innerHTML = '';
            
            this.staff.forEach(member => {
                const staffAppointments = this.appointments.filter(apt => apt.staffId === member.id);
                const staffRevenue = staffAppointments.reduce((sum, apt) => {
                    const service = this.services.find(s => s.id === apt.serviceId);
                    return sum + (service ? service.price : 0);
                }, 0);
                const commission = staffRevenue * member.commission;

                const performanceCard = document.createElement('div');
                performanceCard.className = 'performance-card';
                performanceCard.innerHTML = `
                    <div class="performance-header">
                        <h4>${member.name}</h4>
                        <span class="staff-role">${member.role}</span>
                    </div>
                    <div class="performance-stats">
                        <p>Appointments: ${staffAppointments.length}</p>
                        <p>Revenue: $${staffRevenue}</p>
                        <p>Commission: $${commission.toFixed(2)}</p>
                        <p>Rating: ⭐ 4.8</p>
                    </div>
                `;
                performanceGrid.appendChild(performanceCard);
            });
        }

        if (tbody) {
            tbody.innerHTML = '';
            
            this.staff.forEach(member => {
                const staffAppointments = this.appointments.filter(apt => apt.staffId === member.id);
                const staffRevenue = staffAppointments.reduce((sum, apt) => {
                    const service = this.services.find(s => s.id === apt.serviceId);
                    return sum + (service ? service.price : 0);
                }, 0);
                const commission = staffRevenue * member.commission;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.name}</td>
                    <td>${staffAppointments.length}</td>
                    <td>$${staffRevenue}</td>
                    <td>$${commission.toFixed(2)}</td>
                    <td>⭐ 4.8</td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    renderEyelashesRecords() {
        const tbody = document.getElementById('eyelashes-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const eyelashesRecords = [
            { date: '2026-01-15', client: 'Sarah Johnson', serviceType: 'Classic Extensions', technician: 'Lisa Chen', notes: 'Client satisfied', nextAppointment: '2026-02-15' },
            { date: '2026-01-20', client: 'Maria Garcia', serviceType: 'Volume Lashes', technician: 'Lisa Chen', notes: 'Requested fuller look', nextAppointment: '2026-02-20' }
        ];

        eyelashesRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.client}</td>
                <td>${record.serviceType}</td>
                <td>${record.technician}</td>
                <td>${record.notes}</td>
                <td>${record.nextAppointment}</td>
                <td>
                    <button class="btn btn-sm btn-secondary">Edit</button>
                    <button class="btn btn-sm btn-primary">Book Next</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderFacialRecords() {
        const tbody = document.getElementById('facial-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const facialRecords = [
            { date: '2026-01-18', client: 'Jennifer Smith', treatmentType: 'Deep Cleansing', productsUsed: 'Cleanser, Mask, Moisturizer', esthetician: 'Anna Davis', skinAnalysis: 'Oily T-zone', notes: 'Recommended weekly treatment' },
            { date: '2026-01-25', client: 'Emily Brown', treatmentType: 'Anti-Aging', productsUsed: 'Serum, Eye Cream', esthetician: 'Anna Davis', skinAnalysis: 'Dry skin', notes: 'Client responded well' }
        ];

        facialRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.client}</td>
                <td>${record.treatmentType}</td>
                <td>${record.productsUsed}</td>
                <td>${record.esthetician}</td>
                <td>${record.skinAnalysis}</td>
                <td>${record.notes}</td>
                <td>
                    <button class="btn btn-sm btn-secondary">Edit</button>
                    <button class="btn btn-sm btn-primary">Book Next</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderColorRecords() {
        const tbody = document.getElementById('color-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const colorRecords = [
            { date: '2026-01-22', client: 'Amanda Davis', formula: '6N + 20V', naturalColor: 'Dark Brown', targetColor: 'Light Brown', application: 'Full head', stylist: 'Emma Wilson', notes: 'Even tone achieved' },
            { date: '2026-01-28', client: 'Sarah Johnson', formula: '8RG + 10V', naturalColor: 'Medium Brown', targetColor: 'Copper Red', application: 'Root touch up', stylist: 'Emma Wilson', notes: 'Client loves the color' }
        ];

        colorRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.client}</td>
                <td>${record.formula}</td>
                <td>${record.naturalColor}</td>
                <td>${record.targetColor}</td>
                <td>${record.application}</td>
                <td>${record.stylist}</td>
                <td>${record.notes}</td>
                <td>
                    <button class="btn btn-sm btn-secondary">Edit</button>
                    <button class="btn btn-sm btn-primary">Book Next</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderDispatchNotes() {
        const tbody = document.getElementById('dispatch-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const dispatchNotes = [
            { id: 'DIS001', date: '2026-02-06', items: 'Hair Color Kit x5, Shampoo x10', destination: 'Downtown Salon', status: 'pending', driver: 'John Driver' },
            { id: 'DIS002', date: '2026-02-05', items: 'Nail Polish x20', destination: 'Uptown Spa', status: 'in-transit', driver: 'Mike Driver' }
        ];

        dispatchNotes.forEach(note => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${note.id}</td>
                <td>${note.date}</td>
                <td>${note.items}</td>
                <td>${note.destination}</td>
                <td><span class="status-badge ${note.status}">${note.status}</span></td>
                <td>${note.driver}</td>
                <td>
                    <button class="btn btn-sm btn-secondary">Track</button>
                    <button class="btn btn-sm btn-primary">Update</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderReceivingNotes() {
        const tbody = document.getElementById('receiving-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        const receivingNotes = [
            { id: 'REC001', date: '2026-02-06', supplier: 'Beauty Supply Co.', items: 'Shampoo x20, Conditioner x20', quantity: '40 units', receivedBy: 'Staff 1' },
            { id: 'REC002', date: '2026-02-05', supplier: 'Professional Colors', items: 'Hair Color Kit x10', quantity: '10 units', receivedBy: 'Staff 2' }
        ];

        receivingNotes.forEach(note => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${note.id}</td>
                <td>${note.date}</td>
                <td>${note.supplier}</td>
                <td>${note.items}</td>
                <td>${note.quantity}</td>
                <td>${note.receivedBy}</td>
                <td>
                    <button class="btn btn-sm btn-secondary">View</button>
                    <button class="btn btn-sm btn-primary">Process</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderPeriodBookings() {
        const tbody = document.getElementById('period-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        // Generate sample period data
        const periodData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dayBookings = Math.floor(Math.random() * 10) + 5;
            const dayRevenue = dayBookings * 65;
            
            periodData.push({
                date: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                totalBookings: dayBookings,
                revenue: dayRevenue,
                staffUtilization: Math.floor(Math.random() * 30) + 70
            });
        }

        periodData.forEach(day => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${day.date}</td>
                <td>${day.day}</td>
                <td>${day.totalBookings}</td>
                <td>$${day.revenue}</td>
                <td>${day.staffUtilization}%</td>
                <td>
                    <button class="btn btn-sm btn-secondary">View Details</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderAgentWiseBookings() {
        const agentPerformanceGrid = document.getElementById('agent-performance-grid');
        const tbody = document.getElementById('agent-tbody');
        
        if (agentPerformanceGrid) {
            agentPerformanceGrid.innerHTML = '';
            
            const agents = [
                { name: 'Agent 1', bookings: 25, commission: 15, performance: 'Excellent' },
                { name: 'Agent 2', bookings: 18, commission: 12, performance: 'Good' },
                { name: 'Agent 3', bookings: 22, commission: 14, performance: 'Very Good' }
            ];

            agents.forEach(agent => {
                const agentCard = document.createElement('div');
                agentCard.className = 'agent-performance-card';
                agentCard.innerHTML = `
                    <div class="agent-header">
                        <h4>${agent.name}</h4>
                        <span class="performance-badge ${agent.performance.toLowerCase()}">${agent.performance}</span>
                    </div>
                    <div class="agent-stats">
                        <p>Total Bookings: ${agent.bookings}</p>
                        <p>Commission: ${agent.commission}%</p>
                        <p>Revenue: $${(agent.bookings * 65).toFixed(0)}</p>
                    </div>
                `;
                agentPerformanceGrid.appendChild(agentCard);
            });
        }

        if (tbody) {
            tbody.innerHTML = '';
            
            const agents = [
                { name: 'Agent 1', totalBookings: 25, confirmed: 22, cancelled: 3, revenue: 1625, commission: 15, performance: 'Excellent' },
                { name: 'Agent 2', totalBookings: 18, confirmed: 16, cancelled: 2, revenue: 1170, commission: 12, performance: 'Good' },
                { name: 'Agent 3', totalBookings: 22, confirmed: 20, cancelled: 2, revenue: 1430, commission: 14, performance: 'Very Good' }
            ];

            agents.forEach(agent => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${agent.name}</td>
                    <td>${agent.totalBookings}</td>
                    <td>${agent.confirmed}</td>
                    <td>${agent.cancelled}</td>
                    <td>$${agent.revenue}</td>
                    <td>${agent.commission}%</td>
                    <td><span class="performance-badge ${agent.performance.toLowerCase()}">${agent.performance}</span></td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    // Additional helper functions
    addToRetailCart(product) {
        console.log('Added to retail cart:', product);
        // Implementation for adding to retail cart
    }

    addToServiceCart(service) {
        console.log('Added to service cart:', service);
        // Implementation for adding to service cart
    }

    viewInvoice(invoiceId) {
        console.log('View invoice:', invoiceId);
        // Implementation for viewing invoice
    }

    printInvoice(invoiceId) {
        console.log('Print invoice:', invoiceId);
        // Implementation for printing invoice
    }

    viewVoucher(voucherId) {
        console.log('View voucher:', voucherId);
        // Implementation for viewing voucher
    }

    redeemVoucher(voucherId) {
        console.log('Redeem voucher:', voucherId);
        // Implementation for redeeming voucher
    }

    createInvoice(client, amount) {
        console.log('Create invoice for:', client, amount);
        // Implementation for creating invoice
    }

    editServicePrice(serviceId) {
        console.log('Edit service price:', serviceId);
        // Implementation for editing service price
    }

    // Scheduler rendering function
    renderScheduler() {
        this.setupSchedulerView();
        this.renderWeekView();
    }

    setupSchedulerView() {
        // Setup view toggle buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const view = btn.dataset.view;
                this.switchSchedulerView(view);
            });
        });
    }

    switchSchedulerView(view) {
        // Hide all views
        document.querySelectorAll('.scheduler-view').forEach(v => {
            v.style.display = 'none';
        });
        
        // Show selected view
        const selectedView = document.getElementById(`${view}-view`);
        if (selectedView) {
            selectedView.style.display = 'block';
        }
        
        // Render the appropriate view
        switch(view) {
            case 'week':
                this.renderWeekView();
                break;
            case 'day':
                this.renderDayView();
                break;
            case 'month':
                this.renderMonthView();
                break;
        }
    }

    renderWeekView() {
        const daysContainer = document.getElementById('week-days-container');
        if (!daysContainer) return;

        daysContainer.innerHTML = '';
        
        // Generate week days
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + i);
            
            const dayColumn = document.createElement('div');
            dayColumn.className = 'day-column';
            
            const isToday = currentDay.toDateString() === today.toDateString();
            const dayAppointments = this.appointments.filter(apt => 
                apt.date === currentDay.toISOString().split('T')[0]
            );
            
            dayColumn.innerHTML = `
                <div class="day-header ${isToday ? 'today' : ''}">
                    <div class="day-name">${currentDay.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div class="day-date">${currentDay.getDate()}</div>
                </div>
                <div class="day-appointments">
                    ${this.generateDayAppointments(dayAppointments)}
                </div>
            `;
            
            daysContainer.appendChild(dayColumn);
        }
    }

    generateDayAppointments(appointments) {
        return appointments.map(apt => {
            const client = this.clients.find(c => c.id === apt.clientId);
            const service = this.services.find(s => s.id === apt.serviceId);
            const staff = this.staff.find(s => s.id === apt.staffId);
            
            return `
                <div class="appointment-block" style="background-color: ${this.getServiceColor(service ? service.category : '')};">
                    <div class="appointment-time">${apt.time}</div>
                    <div class="appointment-client">${client ? client.name : 'Unknown'}</div>
                    <div class="appointment-service">${service ? service.name : 'Unknown'}</div>
                    <div class="appointment-staff">${staff ? staff.name : 'Unassigned'}</div>
                </div>
            `;
        }).join('');
    }

    getServiceColor(category) {
        const colors = {
            'Hair': '#667eea',
            'Nails': '#f093fb',
            'Beauty': '#4facfe',
            'Wellness': '#43e97b'
        };
        return colors[category] || '#999';
    }

    renderDayView() {
        const timelineContent = document.getElementById('day-timeline-content');
        if (!timelineContent) return;

        timelineContent.innerHTML = '';
        
        const today = new Date();
        const todayAppointments = this.appointments.filter(apt => 
            apt.date === today.toISOString().split('T')[0]
        );

        todayAppointments.forEach(apt => {
            const client = this.clients.find(c => c.id === apt.clientId);
            const service = this.services.find(s => s.id === apt.serviceId);
            const staff = this.staff.find(s => s.id === apt.staffId);
            
            const appointmentBlock = document.createElement('div');
            appointmentBlock.className = 'timeline-appointment';
            appointmentBlock.innerHTML = `
                <div class="appointment-time">${apt.time}</div>
                <div class="appointment-details">
                    <h4>${client ? client.name : 'Unknown Client'}</h4>
                    <p>${service ? service.name : 'Unknown Service'}</p>
                    <p>Staff: ${staff ? staff.name : 'Unassigned'}</p>
                </div>
            `;
            
            timelineContent.appendChild(appointmentBlock);
        });
    }

    renderMonthView() {
        const monthGrid = document.getElementById('month-grid');
        if (!monthGrid) return;

        monthGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'month-day-header';
            header.textContent = day;
            monthGrid.appendChild(header);
        });
        
        // Generate calendar days
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'month-day empty';
            monthGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'month-day';
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayAppointments = this.appointments.filter(apt => apt.date === dateStr);
            
            if (dayAppointments.length > 0) {
                dayElement.classList.add('has-appointments');
                dayElement.innerHTML = `
                    <div class="month-day-number">${day}</div>
                    <div class="month-day-appointments">${dayAppointments.length}</div>
                `;
            } else {
                dayElement.innerHTML = `<div class="month-day-number">${day}</div>`;
            }
            
            // Highlight today
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            dayElement.addEventListener('click', () => this.showDayAppointments(dateStr));
            monthGrid.appendChild(dayElement);
        }
    }
}

// Initialize the salon management system
const salonSystem = new SalonManagementSystem();

// Add some additional CSS for missing elements
const additionalCSS = `
.staff-card, .service-card, .product-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.staff-info, .service-info, .product-info {
    margin-bottom: 15px;
}

.staff-info h3, .service-info h3, .product-info h3 {
    color: #333;
    margin-bottom: 10px;
}

.staff-info p, .service-info p, .product-info p {
    color: #666;
    margin-bottom: 5px;
}

.price {
    font-weight: bold;
    color: #667eea;
    font-size: 1.1rem;
}

.staff-actions, .service-actions, .product-actions {
    display: flex;
    gap: 10px;
}

.low-stock {
    border-left: 4px solid #ff4757;
}

.in-stock {
    border-left: 4px solid #28a745;
}

.calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid #eee;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.calendar-day:hover {
    background: #f8f9fa;
    border-color: #667eea;
}

.calendar-day.today {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.calendar-day.has-appointments {
    background: #e8f4fd;
    border-color: #667eea;
}

.appointment-count {
    position: absolute;
    top: 5px;
    right: 5px;
    background: #ff4757;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
}

.calendar-day.empty {
    background: transparent;
    border: none;
    cursor: default;
}

.modal-body {
    max-height: 60vh;
    overflow-y: auto;
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);