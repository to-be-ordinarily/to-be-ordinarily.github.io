const STORAGE_THEME_KEY = 'darkTheme';
const HTML_THEME_DATASET_KEY = 'data-color-scheme';
const HTML = document.documentElement;
const TOGGLE_BUTTON_ID = 'themeToggleButton';
const IMG_PATH = '/img';
const LOGO_IMG = IMG_PATH + '/logo';
const PROFILE_IMG = IMG_PATH + '/profile';
const getJsonFromStorage = (key) => JSON.parse(localStorage.getItem(key));

const updateTheme = (isDark) => {
  localStorage.setItem(STORAGE_THEME_KEY, isDark);
        if (isDark.toString() === 'true') {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
        changeThemeImage(isDark);
};

const changeThemeImage = (isDark) =>{
  let darkStr = isDark.toString() === 'true' ? '-dark' : '';
  document.getElementsByClassName('avatar')[0].src = PROFILE_IMG + darkStr + ".png";
  let logoElm = document.getElementsByClassName("logo");
  for(let i = 0; i < logoElm.length; i++){
    logoElm[i].src = LOGO_IMG + darkStr + ".png";
  }

}

const initTheme = () => {
  const isDark =
    getJsonFromStorage(STORAGE_THEME_KEY) ??
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  updateTheme(isDark);
};

const toggleTheme = () => {
  const isDark = getJsonFromStorage(STORAGE_THEME_KEY);
  updateTheme(!isDark);
};

window.addEventListener('click', (e) => {
  if (e.target.id !== TOGGLE_BUTTON_ID) return;
  toggleTheme();
});

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    const isDark = e.matches;
    updateTheme(isDark);
  });

initTheme();