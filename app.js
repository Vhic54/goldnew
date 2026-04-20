let currentMenu = null;
let currentSubMenu = null;
let currency = menuData.currency || '₦';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderMainMenus();
});

// Format price with Naira
function formatPrice(price) {
    return currency + price.toLocaleString();
}

// Render main menu list (Home view)
function renderMainMenus() {
    const app = document.getElementById('app');
    
    
    app.innerHTML = `
        <div class="fade-in">
            <h2 class="text-center mb-4 display-font text-dark">Select a Menu</h2>
            <div class="row g-4">
                ${menuData.menus.map(menu => `
                    <div class="col-md-6 col-lg-4">
                        <div class="menu-card" onclick="showSubMenus('${menu.id}')">
                            <div class="card-body">
								
                                <h4 class="card-title display-font">${menu.name}</h4>
                                <p class="card-text text-muted">${menu.description}</p>
                                <span class="badge bg-light text-dark">${menu.subMenus.length} categories</span>
                                <i class="bi bi-chevron-right arrow-icon"></i>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Show sub-menus for selected main menu
function showSubMenus(menuId) {
    currentMenu = menuData.menus.find(m => m.id === menuId);
    if (!currentMenu) return;

    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="fade-in">
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="#" onclick="renderMainMenus(); return false;">Home</a></li>
                    <li class="breadcrumb-item active">${currentMenu.name}</li>
                </ol>
            </nav>
            
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="display-font mb-1">${currentMenu.name}</h2>
                    <p class="text-muted mb-0">${currentMenu.description}</p>
                </div>
                <button class="btn-back" onclick="renderMainMenus()">
                    <i class="bi bi-arrow-left"></i> Back
                </button>
            </div>
            
            <div class="row g-3">
                ${currentMenu.subMenus.map(sub => `
                    <div class="col-md-6">
                        <div class="submenu-card" onclick="showItems('${sub.id}')">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="mb-1 display-font">${sub.name}</h5>
                                    <small class="text-muted">${sub.items.length} items available</small>
                                </div>
                                <i class="bi bi-arrow-right-circle fs-4 text-primary"></i>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Show items for selected sub-menu
function showItems(subMenuId) {
    currentSubMenu = currentMenu.subMenus.find(s => s.id === subMenuId);
    if (!currentSubMenu) return;

    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="fade-in">
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="#" onclick="renderMainMenus(); return false;">Home</a></li>
                    <li class="breadcrumb-item"><a href="#" onclick="showSubMenus('${currentMenu.id}'); return false;">${currentMenu.name}</a></li>
                    <li class="breadcrumb-item active">${currentSubMenu.name}</li>
                </ol>
            </nav>
            
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="display-font mb-1">${currentSubMenu.name}</h2>
                    <p class="text-muted mb-0">${currentMenu.name} Menu</p>
                </div>
                <button class="btn-back" onclick="showSubMenus('${currentMenu.id}')">
                    <i class="bi bi-arrow-left"></i> Back
                </button>
            </div>
            
            <div class="items-list">
                ${currentSubMenu.items.map(item => `
                    <div class="item-card">
                        <div class="row align-items-center">
                            <div class="col-md-8">
                                <h5 class="mb-1 display-font">${item.name}</h5>
                                <p class="text-muted mb-0">${item.description}</p>
                            </div>
                            <div class="col-md-4 text-md-end mt-3 mt-md-0">
                                <span class="price-tag">${formatPrice(item.price)}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
