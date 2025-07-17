const searchInput = document.getElementById('search');
const listContainer = document.getElementById('scholarship-list');

// Sample fallback data if Google Sheets doesn't load
let scholarships = [
  {
    name: "Buddy4Study Scholarship",
    description: "Multiple scholarships for Indian students.",
    link: "https://www.buddy4study.com/"
  },
  {
    name: "NSP (National Scholarship Portal)",
    description: "Central and state government scholarships.",
    link: "https://scholarships.gov.in/"
  },
  {
    name: "Vidyasaarathi Scholarship",
    description: "Private sector scholarship management portal.",
    link: "https://www.vidyasaarathi.co.in/"
  },
  {
    name: "Cummins Scholarship",
    description: "For engineering students in select regions.",
    link: "https://www.cumminsindia.com/cummins-scholarship"
  }
];

// Load scholarships from Google Sheets (optional)
async function fetchFromSheet() {
  try {
    const sheetID = 'YOUR_GOOGLE_SHEET_ID';
    const sheetRange = 'Sheet1!A2:C'; // Name | Description | Link
    const apiKey = 'YOUR_GOOGLE_API_KEY';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetRange}?key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.values) {
      scholarships = data.values.map(row => ({
        name: row[0],
        description: row[1],
        link: row[2]
      }));
    }
  } catch (err) {
    console.warn('Using fallback data due to error:', err.message);
  }

  renderScholarships(scholarships);
}

function renderScholarships(data) {
  listContainer.innerHTML = '';
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'scholarship';
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank">Apply Now</a>
    `;
    listContainer.appendChild(div);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = scholarships.filter(s =>
    s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)
  );
  renderScholarships(filtered);
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Initial load
fetchFromSheet();