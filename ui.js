/**
 * BidMaster Elite - UI Components & Rendering
 */

const UI = {
    // Render an auction card
    createAuctionCard: function(item) {
        const isLive = item.timeRemaining < 36000; // Just a simulation rule
        return `
            <div class="auction-card" data-id="${item.id}">
                <div class="card-img">
                    <span class="card-badge ${isLive ? 'live' : ''}">${isLive ? 'LIVE' : 'UPCOMING'}</span>
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="card-content">
                    <span class="card-cat">${item.category}</span>
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-stats">
                        <div class="stat-box">
                            <small>Current Bid</small>
                            <strong>$${item.currentBid.toLocaleString()}</strong>
                        </div>
                        <div class="stat-box">
                            <small>Ends In</small>
                            <strong class="countdown" data-time="${item.timeRemaining}">${this.formatTime(item.timeRemaining)}</strong>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="auction-details.html?id=${item.id}" class="btn btn-primary">Bid Now</a>
                        <button class="btn btn-outline icon-only watchlist-toggle" data-id="${item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Format seconds to HH:MM:SS
    formatTime: function(seconds) {
        if (seconds <= 0) return "00h : 00m : 00s";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
    },

    // Render a list of auctions to a container
    renderAuctions: function(items, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (items.length === 0) {
            container.innerHTML = '<div class="no-results">No auctions found matching your criteria.</div>';
            return;
        }

        container.innerHTML = items.map(item => this.createAuctionCard(item)).join('');
    },

    // Initialize countdown timers
    initCountdowns: function() {
        setInterval(() => {
            const timers = document.querySelectorAll('.countdown');
            timers.forEach(timer => {
                let time = parseInt(timer.getAttribute('data-time'));
                if (time > 0) {
                    time--;
                    timer.setAttribute('data-time', time);
                    timer.textContent = this.formatTime(time);
                }
            });
        }, 1000);
    },

    // Show a notification toast
    showToast: function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Handle Tab Switching
    initTabs: function() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                const parent = btn.closest('.detail-tabs');
                
                // Update buttons
                parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update panes
                parent.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                document.getElementById(`tab-${tabId}`).classList.add('active');
            });
        });
    }
};

// Add toast styles dynamically
const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 15px 25px;
        background: var(--primary);
        color: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 2000;
    }
    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }
    .toast-success { border-left: 5px solid var(--success); }
    .toast-danger { border-left: 5px solid var(--danger); }
    .no-results { grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted); }
`;
document.head.appendChild(style);
