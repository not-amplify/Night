// Retrieve apps from localStorage or set to default if not present
let apps = JSON.parse(localStorage.getItem('apps')) || [
{ name: 'Github', url: 'https://github.com', imgUrl: '/static/images/icons/github.png', isPinned: false }

// Add more predefined apps here
];

function saveAppData() {
localStorage.setItem('apps', JSON.stringify(apps));
}

function addApp() {
const name = document.getElementById('appName').value;
const url = document.getElementById('appUrl').value;
const imgUrl = document.getElementById('appImgUrl').value;

if (name && url && imgUrl) {
apps.push({ name, url, imgUrl, isPinned: false });
renderApps();
saveAppData(); // Save to localStorage after adding a new app
clearForm(); // Clear the form fields after adding
} else {
alert('Please ensure all fields are filled in correctly.');
}
}

function renderApps() {
    // Sort the apps array alphabetically by the app's name.
    apps.sort((a, b) => a.name.localeCompare(b.name));
  
    // Assuming `appsContainer` is your element where apps are displayed.
    const appsContainer = document.getElementById('appsContainer'); 
    appsContainer.innerHTML = ''; // Clear the current list
  
    // Iterate over the sorted apps array to render all apps.
    apps.forEach(app => {
      // Get the element representation for the app (you should define this based on your HTML structure).
      const appElement = getAppElement(app);
      appsContainer.appendChild(appElement);
    });
  }

function getAppElement(app, index) {
const appShortcut = document.createElement('div');
appShortcut.className = 'app-shortcut';
appShortcut.innerHTML = `
<a href="${app.url}" target="_blank" title="${app.name}"><img src="${app.imgUrl}" alt="${app.name}"></a>
<button class="pin-button" onclick="togglePin(${index})">${app.isPinned ? 'Unpin' : 'Pin'}</button>
`;
return appShortcut;
}

function togglePin(index) {
apps[index].isPinned = !apps[index].isPinned;
renderApps();
saveAppData(); // Save to localStorage after toggling the pinned state
}

function clearForm() {
document.getElementById('appName').value = '';
document.getElementById('appUrl').value = '';
document.getElementById('appImgUrl').value = '';
}

// Bind the add app function to the form submission
document.getElementById('newAppForm').onsubmit = function(event) {
event.preventDefault();
addApp();
};

// Render apps on window load
window.onload = renderApps;