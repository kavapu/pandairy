// Static Diary App - No Backend Required
// All data stored in LocalStorage

// Global variables
let currentDate = new Date();

// DOM Elements
let liveTime, liveDate, dayOfWeek, diaryTextarea, saveBtn, prevDayBtn, nextDayBtn, currentDaySpan, historyBtn, pandaImage;
let currentMood, moodEmoji, emojiGrid;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing static diary app...');
    
    // Initialize DOM elements
    initializeDOMElements();
    
    // Setup all features
    setupLiveClock();
    setupDiary();
    updateCurrentDay();
    setupMoodSelector();
    updateMoodDisplay();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('🐼 Welcome to your Panda Diary! Your entries are saved locally.', 'success');
    }, 2000);
    
    console.log('Static app initialization complete');
}

function initializeDOMElements() {
    // Time elements
    liveTime = document.getElementById('liveTime');
    liveDate = document.getElementById('liveDate');
    dayOfWeek = document.getElementById('dayOfWeek');
    
    // Diary elements
    diaryTextarea = document.getElementById('diaryTextarea');
    saveBtn = document.getElementById('saveBtn');
    prevDayBtn = document.getElementById('prevDayBtn');
    nextDayBtn = document.getElementById('nextDayBtn');
    currentDaySpan = document.getElementById('currentDay');
    historyBtn = document.getElementById('historyBtn');
    pandaImage = document.querySelector('.panda-image');
    
    // Mood elements
    currentMood = document.getElementById('currentMood');
    moodEmoji = document.getElementById('moodEmoji');
    emojiGrid = document.getElementById('emojiGrid');
    
    console.log('DOM Elements initialized');
}

// Live Clock Functions
function setupLiveClock() {
    console.log('Setting up live clock...');
    
    // Force initial update
    updateClock();
    
    // Update every second for accurate time display
    setInterval(updateClock, 1000);
    
    console.log('Live clock setup complete');
}

function updateClock() {
    const now = new Date();
    
    // Update time (every second for accurate display)
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    if (liveTime) {
        liveTime.textContent = timeString;
    }
    
    // Update date (only if changed - once per day)
    const dateString = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    if (liveDate && liveDate.textContent !== dateString) {
        liveDate.textContent = dateString;
    }
    
    // Update day of week (only if changed)
    const dayString = now.toLocaleDateString('en-US', { weekday: 'long' });
    if (dayOfWeek && dayOfWeek.textContent !== dayString) {
        dayOfWeek.textContent = dayString;
    }
}

// Diary Functions
function setupDiary() {
    // Load today's entry
    loadDiaryEntry();
    
    // Event listeners
    saveBtn.addEventListener('click', saveDiaryEntry);
    historyBtn.addEventListener('click', showHistory);
    prevDayBtn.addEventListener('click', () => navigateDay(-1));
    nextDayBtn.addEventListener('click', () => navigateDay(1));
    
    // Auto-save on input with debouncing
    const debouncedAutoSave = debounce(() => {
        autoSave();
    }, 2000); // 2 second debounce
    
    diaryTextarea.addEventListener('input', debouncedAutoSave);
    
    // Mood selector setup
    if (emojiGrid) {
        const emojiButtons = emojiGrid.querySelectorAll('.emoji-btn');
        emojiButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mood = btn.dataset.mood;
                const emoji = btn.dataset.emoji;
                selectMood(mood, emoji);
            });
        });
    }
}

function loadDiaryEntry() {
    const dateKey = formatDateKey(currentDate);
    console.log('Loading diary entry for:', dateKey);
    
    // Load from LocalStorage
    const entry = localStorage.getItem(`diary_${dateKey}`);
    diaryTextarea.textContent = entry || '';
}

function saveDiaryEntry() {
    const dateKey = formatDateKey(currentDate);
    const content = diaryTextarea.textContent.trim();
    
    if (!content) {
        showNotification('Please write something before saving! 📝');
        return;
    }
    
    // Save to LocalStorage
    localStorage.setItem(`diary_${dateKey}`, content);
    
    // Animate panda
    pandaImage.classList.add('panda-bounce');
    setTimeout(() => {
        pandaImage.classList.remove('panda-bounce');
    }, 800);
    
    // Show success message
    showNotification('Entry saved locally! 🐼', 'success');
}

function autoSave() {
    const content = diaryTextarea.textContent.trim();
    if (content) {
        const dateKey = formatDateKey(currentDate);
        localStorage.setItem(`diary_${dateKey}`, content);
    }
}

function navigateDay(direction) {
    // Add page flip animation
    const diaryCard = document.querySelector('.diary-card');
    diaryCard.classList.add('page-flip');
    
    setTimeout(() => {
        // Update date
        currentDate.setDate(currentDate.getDate() + direction);
        updateCurrentDay();
        
        // Load entry for new date
        loadDiaryEntry();
        
        // Remove animation class
        diaryCard.classList.remove('page-flip');
    }, 300);
}

function updateCurrentDay() {
    const today = new Date();
    const diffTime = currentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        currentDaySpan.textContent = 'Today';
    } else if (diffDays === 1) {
        currentDaySpan.textContent = 'Tomorrow';
    } else if (diffDays === -1) {
        currentDaySpan.textContent = 'Yesterday';
    } else if (diffDays > 1) {
        currentDaySpan.textContent = `In ${diffDays} days`;
    } else {
        currentDaySpan.textContent = `${Math.abs(diffDays)} days ago`;
    }
    
    // Disable navigation buttons for future dates
    const maxFutureDays = 7;
    nextDayBtn.disabled = diffDays >= maxFutureDays;
    prevDayBtn.disabled = diffDays <= -365; // Allow 1 year back
}

function formatDateKey(date) {
    return date.toISOString().split('T')[0];
}

// History Functions
function showHistory() {
    console.log('Showing local history...');
    
    // Get local entries and clean them
    const localEntries = getLocalEntries();
    displayHistoryModal(localEntries);
}

function getLocalEntries() {
    const entries = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('diary_')) {
            const date = key.replace('diary_', '');
            const content = localStorage.getItem(key);
            
            // Skip entries with invalid dates or 'true' content
            if (isValidDate(date) && content !== 'true' && content.trim() !== '') {
                const savedMood = localStorage.getItem(`mood_${date}`);
                let moodData = null;
                if (savedMood) {
                    try {
                        moodData = JSON.parse(savedMood);
                    } catch (error) {
                        console.error('Error parsing mood data:', error);
                    }
                }
                entries.push({ date, content, moodData });
            }
        }
    }
    return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString.length === 10;
}

function displayHistoryModal(entries) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'history-modal';
    modal.innerHTML = `
        <div class="history-modal-content">
            <div class="history-modal-header">
                <h3>📚 Diary History</h3>
                <button class="close-btn">×</button>
            </div>
            <div class="history-modal-body">
                ${entries.length === 0 ? '<p class="no-entries">No entries found. Start writing to see your history!</p>' : 
                entries.map(entry => `
                    <div class="history-entry">
                        <div class="history-entry-date">${formatDisplayDate(entry.date)}</div>
                        ${entry.moodData ? `<div class="history-entry-mood">${entry.moodData.emoji} ${entry.moodData.mood}</div>` : ''}
                        <div class="history-entry-content">${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for closing the modal
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeHistoryModal);
    
    // Also close when clicking outside the modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeHistoryModal();
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeHistoryModal();
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Store the escape handler for cleanup
    modal._escapeHandler = handleEscape;
}

function closeHistoryModal() {
    const modal = document.querySelector('.history-modal');
    if (modal) {
        // Clean up event listeners
        if (modal._escapeHandler) {
            document.removeEventListener('keydown', modal._escapeHandler);
        }
        
        // Remove the modal
        modal.remove();
    }
}

function formatDisplayDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Mood Functions
function selectMood(mood, emoji) {
    // Save to localStorage
    const dateKey = formatDateKey(currentDate);
    localStorage.setItem(`mood_${dateKey}`, JSON.stringify({ mood, emoji }));
    
    // Update display
    currentMood.textContent = mood;
    moodEmoji.textContent = emoji;
    
    // Update button states
    const emojiButtons = emojiGrid.querySelectorAll('.emoji-btn');
    emojiButtons.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.mood === mood) {
            btn.classList.add('selected');
        }
    });
    
    // Show success message
    showNotification(`😊 Mood set to: ${mood}`, 'success');
}

function updateMoodDisplay() {
    const dateKey = formatDateKey(currentDate);
    const savedMood = localStorage.getItem(`mood_${dateKey}`);
    
    if (savedMood) {
        try {
            const moodData = JSON.parse(savedMood);
            currentMood.textContent = moodData.mood;
            moodEmoji.textContent = moodData.emoji;
            
            // Update button states
            const emojiButtons = emojiGrid.querySelectorAll('.emoji-btn');
            emojiButtons.forEach(btn => {
                btn.classList.remove('selected');
                if (btn.dataset.mood === moodData.mood) {
                    btn.classList.add('selected');
                }
            });
        } catch (error) {
            console.error('Error parsing saved mood:', error);
            resetMoodDisplay();
        }
    } else {
        resetMoodDisplay();
    }
}

function resetMoodDisplay() {
    currentMood.textContent = "How are you feeling today?";
    moodEmoji.textContent = "😊";
    
    // Remove selected state from all buttons
    const emojiButtons = emojiGrid.querySelectorAll('.emoji-btn');
    emojiButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
}

function setupMoodSelector() {
    // Initialize mood display
    updateMoodDisplay();
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    
    const colors = {
        info: 'rgba(52, 152, 219, 0.9)',
        success: 'rgba(46, 204, 113, 0.9)',
        warning: 'rgba(241, 196, 15, 0.9)',
        error: 'rgba(231, 76, 60, 0.9)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveDiaryEntry();
    }
    
    // Left/Right arrows to navigate days (when not typing)
    if (e.target !== diaryTextarea) {
        if (e.key === 'ArrowLeft') {
            navigateDay(-1);
        } else if (e.key === 'ArrowRight') {
            navigateDay(1);
        }
    }
});

// Initialize with a welcome message for new users
if (!localStorage.getItem('diary_welcome_shown')) {
    setTimeout(() => {
        showNotification('Welcome to your Panda Diary! 🐼 Start writing about your day!');
        localStorage.setItem('diary_welcome_shown', 'true');
    }, 1000);
}

// Make closeHistoryModal globally accessible
window.closeHistoryModal = closeHistoryModal;
