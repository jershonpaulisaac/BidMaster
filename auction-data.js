/**
 * BidMaster Elite - Auction Data Simulation
 * Contains 30+ luxury auction items
 */

const auctionData = [
    {
        id: 1,
        title: "Classic Luxury Watch",
        category: "watches",
        image: "https://images.unsplash.com/photo-1766518303334-aaa928ceed45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ymx1ZSUyMGRpYWwlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        description: "A timeless luxury watch with a blue dial. Comes with original box and papers. Perfect condition.",
        startingPrice: 80000,
        currentBid: 124500,
        seller: "EliteCollections",
        timeRemaining: 12345,
        bidHistory: [
            { bidder: "TimeLord", amount: 124500, time: "2 mins ago" },
            { bidder: "CollectorX", amount: 123000, time: "15 mins ago" },
            { bidder: "WatchFan", amount: 120000, time: "1 hour ago" }
        ],
        featured: true,
        trending: true
    },
    {
        id: 2,
        title: "Modern Abstract Painting",
        category: "art",
        image: "https://images.unsplash.com/photo-1691786835298-a49aa3113cab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZXJuJTIwYWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8fDA%3D",
        description: "Original oil painting on canvas. Large size, perfect for a modern living room. Includes certificate of authenticity.",
        startingPrice: 5000,
        currentBid: 12500,
        seller: "VanceGallery",
        timeRemaining: 86400,
        bidHistory: [
            { bidder: "ArtLover", amount: 12500, time: "1 hour ago" },
            { bidder: "InteriorDesign", amount: 11000, time: "3 hours ago" }
        ],
        featured: true,
        trending: false
    },
    {
        id: 3,
        title: "Vintage Sports Car",
        category: "cars",
        image: "https://images.unsplash.com/photo-1758795680399-ce2de16cacf1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZpbnRhZ2UlMjBzcG9ydHMlMjBjYXJ8ZW58MHx8MHx8fDA%3D",
        description: "A beautiful replica of a classic 1960s sports car. Features a modern engine for reliability. Street legal and ready to drive.",
        startingPrice: 150000,
        currentBid: 210000,
        seller: "ClassicMotors",
        timeRemaining: 172800,
        bidHistory: [
            { bidder: "SpeedDemon", amount: 210000, time: "5 hours ago" },
            { bidder: "V12Fan", amount: 205000, time: "1 day ago" }
        ],
        featured: true,
        trending: true
    },
    {
        id: 4,
        title: "Diamond Engagement Ring",
        category: "jewelry",
        image: "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlhbW9uZCUyMHJpbmd8ZW58MHx8MHx8fDA%3D",
        description: "Stunning diamond ring with a platinum band. High quality diamonds with GIA certification.",
        startingPrice: 15000,
        currentBid: 18200,
        seller: "LuxuryGems",
        timeRemaining: 43200,
        bidHistory: [
            { bidder: "RomanticSoul", amount: 18200, time: "30 mins ago" }
        ],
        featured: false,
        trending: true
    },
    {
        id: 5,
        title: "Modern Luxury Mansion",
        category: "real-estate",
        image: "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D",
        description: "Large 7-bedroom home with amazing views. Includes a pool and private cinema. Modern design throughout.",
        startingPrice: 5000000,
        currentBid: 7200000,
        seller: "PrimeEstates",
        timeRemaining: 604800,
        bidHistory: [
            { bidder: "InvestorGroup", amount: 7200000, time: "2 days ago" }
        ],
        featured: true,
        trending: false
    },
    {
        id: 6,
        title: "Rare Collectible Card",
        category: "collectibles",
        image: "https://images.unsplash.com/photo-1589659665013-cf532f068e82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhcmUlMjBjb2xsZWN0YWJsZSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
        description: "One of the rarest collectible cards in existence. Perfect condition, graded by experts.",
        startingPrice: 20000,
        currentBid: 315000,
        seller: "PokeMaster",
        timeRemaining: 3600,
        bidHistory: [
            { bidder: "GottaCatchEmAll", amount: 315000, time: "10 mins ago" },
            { bidder: "NostalgiaTrip", amount: 310000, time: "20 mins ago" }
        ],
        featured: true,
        trending: true
    },
    {
        id: 7,
        title: "Classic Gold Watch",
        category: "watches",
        image: "https://images.unsplash.com/photo-1493799582117-9a58bc07a8de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xhc3NpYyUyMGdvbGQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        description: "Vintage gold watch in excellent condition. A true collector's item.",
        startingPrice: 100000,
        currentBid: 185000,
        seller: "HeritageWatches",
        timeRemaining: 54000,
        bidHistory: [
            { bidder: "VintageKing", amount: 185000, time: "4 hours ago" }
        ],
        featured: false,
        trending: true
    },
    {
        id: 8,
        title: "Street Art Print",
        category: "art",
        image: "https://images.unsplash.com/photo-1603138687360-5eb08ebcbce0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0JTIwYXJ0JTIwcHJpbnR8ZW58MHx8MHx8fDA%3D",
        description: "Signed limited edition print from a famous street artist. Framed and ready to hang.",
        startingPrice: 25000,
        currentBid: 42000,
        seller: "UrbanArtCo",
        timeRemaining: 95000,
        bidHistory: [
            { bidder: "StreetArtFan", amount: 42000, time: "6 hours ago" }
        ],
        featured: false,
        trending: false
    },
    {
        id: 9,
        title: "Classic Silver Sports Car",
        category: "cars",
        image: "https://images.unsplash.com/photo-1750097297099-ca53d05b2495?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2lsdmVyJTIwc3BvcnRzJTIwY2FyfGVufDB8fDB8fHww",
        description: "Iconic silver sports car from the 1950s. Fully restored to original condition.",
        startingPrice: 1000000,
        currentBid: 1450000,
        seller: "ClassicMotors",
        timeRemaining: 259200,
        bidHistory: [
            { bidder: "AutoMuseum", amount: 1450000, time: "1 day ago" }
        ],
        featured: true,
        trending: false
    },
    {
        id: 10,
        title: "Blue Sapphire Necklace",
        category: "jewelry",
        image: "https://images.unsplash.com/photo-1767921804162-9c55a278768d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Qmx1ZSUyMFNhcHBoaXJlJTIwTmVja2xhY2V8ZW58MHx8MHx8fDA%3D",
        description: "Beautiful blue sapphire necklace surrounded by diamonds. High quality gemstones.",
        startingPrice: 45000,
        currentBid: 62000,
        seller: "LuxuryGems",
        timeRemaining: 120000,
        bidHistory: [
            { bidder: "GemCollector", amount: 62000, time: "12 hours ago" }
        ],
        featured: false,
        trending: false
    },
    ];

// Helper to get item by ID
function getAuctionById(id) {
    return auctionData.find(item => item.id === parseInt(id));
}

// Helper to filter items
function filterAuctions(filters) {
    return auctionData.filter(item => {
        if (filters.category && filters.category !== 'all' && item.category !== filters.category) return false;
        if (filters.minPrice && item.currentBid < filters.minPrice) return false;
        if (filters.maxPrice && item.currentBid > filters.maxPrice) return false;
        if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
    });
}
