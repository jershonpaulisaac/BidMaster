/**
 * BidMaster Elite - Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Global Navigation & Mobile Menu
    initNavigation();

    // 2. RTL / LTR Toggle
    initDirToggle();

    // 3. Page Specific Logic
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    if (page === "index.html") {
        initHomePage();
        renderTopSellers();
        initStatsCounter();
    } else if (page === "auctions.html") {
        initAuctionsPage();
    } else if (page === "auction-details.html") {
        initAuctionDetailsPage();
    } else if (page === "contact.html") {
        initContactPage();
    } else if (page === "dashboard.html") {
        initDashboardPage();
    } else if (page === "profile.html") {
        initProfilePage();
    }

    // 4. Global Search
    initGlobalSearch();

    // 5. Start Countdowns
    UI.initCountdowns();
});

function initNavigation() {
    const nav = document.getElementById('main-nav');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Notification Dropdown
    const notifBtn = document.getElementById('notification-btn');
    const notifDropdown = document.getElementById('notification-dropdown');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            notifDropdown.classList.remove('active');
        });

        notifDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

function initDirToggle() {
    const btn = document.getElementById('dir-toggle');
    btn.addEventListener('click', () => {
        const currentDir = document.body.dir || "ltr";
        const newDir = currentDir === "ltr" ? "rtl" : "ltr";
        document.body.dir = newDir;
        document.body.classList.toggle('rtl', newDir === "rtl");
        
        // UI.showToast(`Switched to ${newDir.toUpperCase()} mode`);
    });
}

function initHomePage() {
    const featured = auctionData.filter(item => item.featured).slice(0, 3);
    const trending = auctionData.filter(item => item.trending).slice(0, 6);

    UI.renderAuctions(featured, 'featured-grid');
    UI.renderAuctions(trending, 'trending-grid');
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-num');
    
    const animate = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const count = parseInt(el.innerText);
        const speed = 2000 / target; // Total time 2s
        
        const increment = target / 100;
        
        if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => animate(el), 20);
        } else {
            // Final formatting
            if (target >= 1000000) {
                el.innerText = `$${(target / 1000000).toFixed(0)}M+`;
            } else if (target >= 1000) {
                el.innerText = `${(target / 1000).toFixed(0)}k+`;
            } else if (el.id === 'stat-rate') {
                el.innerText = `${target}%`;
            } else {
                el.innerText = target;
            }
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function renderTopSellers() {
    const sellersGrid = document.querySelector('.sellers-grid');
    if (!sellersGrid) return;

    const sellers = [
        { name: "EliteCollections", sales: "$4.2M", img: "s1" },
        { name: "VanceGallery", sales: "$3.8M", img: "s2" },
        { name: "HeritageAuto", sales: "$2.9M", img: "s3" },
        { name: "GemStoneElite", sales: "$1.5M", img: "s4" },
        { name: "TimeKeepers", sales: "$1.2M", img: "s5" },
        { name: "PrimeEstates", sales: "$950K", img: "s6" }
    ];

    sellersGrid.innerHTML = sellers.map((seller, index) => `
        <div class="seller-card">
            <div class="seller-rank">${(index + 1).toString().padStart(2, '0')}</div>
            <img src="https://picsum.photos/seed/${seller.img}/80/80" alt="${seller.name}">
            <div class="seller-info">
                <h3>${seller.name}</h3>
                <p>${seller.sales} Sales</p>
            </div>
        </div>
    `).join('');
}

function initAuctionsPage() {
    // Initial render
    UI.renderAuctions(auctionData, 'auctions-listing-grid');

    // Filter Logic
    const applyBtn = document.getElementById('apply-filters');
    const clearBtn = document.getElementById('clear-filters');
    const catCheckboxes = document.querySelectorAll('.checkbox-container input');
    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');
    const sortSelect = document.getElementById('sort-select');

    const handleFilters = () => {
        let selectedCat = 'all';
        catCheckboxes.forEach(cb => {
            if (cb.checked) selectedCat = cb.value;
        });

        let filtered = filterAuctions({
            category: selectedCat,
            minPrice: parseFloat(minInput.value) || 0,
            maxPrice: parseFloat(maxInput.value) || Infinity
        });

        // Sorting
        const sort = sortSelect.value;
        if (sort === 'price-low') filtered.sort((a, b) => a.currentBid - b.currentBid);
        if (sort === 'price-high') filtered.sort((a, b) => b.currentBid - a.currentBid);
        if (sort === 'ending-soon') filtered.sort((a, b) => a.timeRemaining - b.timeRemaining);

        UI.renderAuctions(filtered, 'auctions-listing-grid');
        document.getElementById('results-count').textContent = `Showing ${filtered.length} items`;
    };

    applyBtn.addEventListener('click', handleFilters);
    clearBtn.addEventListener('click', () => {
        minInput.value = '';
        maxInput.value = '';
        catCheckboxes.forEach(cb => cb.checked = cb.value === 'all');
        UI.renderAuctions(auctionData, 'auctions-listing-grid');
    });

    // View Toggles
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');
    const grid = document.getElementById('auctions-listing-grid');

    gridBtn.addEventListener('click', () => {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        grid.classList.remove('list-view');
    });

    listBtn.addEventListener('click', () => {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        grid.classList.add('list-view');
    });
}

function initAuctionDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || 1;
    const item = getAuctionById(id);

    if (!item) {
        window.location.href = 'auctions.html';
        return;
    }

    // Populate Data
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('breadcrumb-current').textContent = item.title;
    document.getElementById('detail-category').textContent = item.category;
    document.getElementById('detail-current-bid').textContent = `$${item.currentBid.toLocaleString()}`;
    document.getElementById('detail-starting-price').textContent = `$${item.startingPrice.toLocaleString()}`;
    document.getElementById('detail-description').textContent = item.description;
    document.getElementById('main-product-img').src = item.image;
    document.getElementById('detail-countdown').setAttribute('data-time', item.timeRemaining);

    // Bid History
    const historyBody = document.getElementById('bid-history-body');
    if (item.bidHistory) {
        historyBody.innerHTML = item.bidHistory.map(bid => `
            <tr>
                <td>${bid.bidder}</td>
                <td>$${bid.amount.toLocaleString()}</td>
                <td>${bid.time}</td>
            </tr>
        `).join('');
    }

    // Related Items
    const related = auctionData.filter(i => i.category === item.category && i.id !== item.id).slice(0, 3);
    UI.renderAuctions(related, 'related-grid');

    // Bidding Simulation
    const bidBtn = document.getElementById('place-bid-btn');
    const bidInput = document.getElementById('bid-amount');

    bidBtn.addEventListener('click', () => {
        const amount = parseFloat(bidInput.value);
        if (isNaN(amount) || amount <= item.currentBid) {
            UI.showToast(`Please enter a bid higher than $${item.currentBid.toLocaleString()}`, 'danger');
            return;
        }

        // Simulate update
        item.currentBid = amount;
        document.getElementById('detail-current-bid').textContent = `$${amount.toLocaleString()}`;
        
        // Add to history
        const newBid = { bidder: "You (Guest)", amount: amount, time: "Just now" };
        item.bidHistory.unshift(newBid);
        historyBody.innerHTML = `
            <tr>
                <td>${newBid.bidder}</td>
                <td>$${newBid.amount.toLocaleString()}</td>
                <td>${newBid.time}</td>
            </tr>
        ` + historyBody.innerHTML;

        UI.showToast(`Success! You are now the highest bidder.`);
        bidInput.value = '';
    });

    UI.initTabs();
}

function initContactPage() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.add('hidden');
        success.classList.remove('hidden');
        UI.showToast('Message sent successfully!');
    });
}

function initDashboardPage() {
    const watchlist = auctionData.slice(10, 13);
    UI.renderAuctions(watchlist, 'watchlist-grid');
}

function initProfilePage() {
    const toggleBtn = document.getElementById('toggle-edit-btn');
    const cancelBtn = document.getElementById('cancel-edit-btn');
    const form = document.getElementById('profile-form');
    const editActions = document.getElementById('edit-actions');
    const avatarBtn = document.getElementById('edit-avatar-btn');
    const inputs = form.querySelectorAll('input, textarea');

    const toggleEdit = (isEditing) => {
        inputs.forEach(input => {
            input.readOnly = !isEditing;
        });
        avatarBtn.disabled = !isEditing;
        editActions.classList.toggle('hidden', !isEditing);
        toggleBtn.classList.toggle('hidden', isEditing);
    };

    toggleBtn.addEventListener('click', () => toggleEdit(true));
    cancelBtn.addEventListener('click', () => toggleEdit(false));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        UI.showToast('Profile updated successfully!');
        toggleEdit(false);
    });
}

function initGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    const catSelect = document.getElementById('category-select');
    const searchBtn = document.querySelector('.search-btn');

    const performSearch = () => {
        const query = searchInput.value;
        const cat = catSelect.value;
        if (query.trim() === "" && cat === "all") return;
        
        window.location.href = `auctions.html?search=${encodeURIComponent(query)}&cat=${cat}`;
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}
