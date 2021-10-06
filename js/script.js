(() => {

  const toggleMenu = () => {
    const menu = document.querySelector('.hamburger-menu');
    const list = menu.querySelector('.fadeOut');

    menu.addEventListener('click', () => {
      if (menu.classList.contains('close')) {
        menu.classList.remove('close');
        list.classList.remove('active');
      } else {
        menu.classList.add('close');
        list.classList.add('active');
      }
    });
  }

  const langChange = () => {
    const langs = document.querySelectorAll('.langs li');
    const linksL = document.querySelectorAll('header .left a');
    const linksR = document.querySelectorAll('header .right a');
    const btn = document.querySelectorAll('.mainBtn'); 
    const view = document.querySelectorAll('.menus');
    const h2 = document.querySelectorAll('h2');
    const p = document.querySelectorAll('p'); 
    const order = document.querySelector('.order');
    const h1 = document.querySelector('h1');    


    const removeActive = () => {
      langs.forEach(el => {
        el.classList.remove('active');
      });
    }
    
    langs.forEach(el => {
      el.addEventListener('click', () => {
        removeActive();
        el.classList.add('active');

        const attr = el.getAttribute('id');

        const translate = (selector, lang) => {
          const key = selector.getAttribute('key');
          selector.textContent = lang[0][attr][key]
        }

        const translateMult = (selector, lang) => {
          selector.forEach(el => {
            const key = el.getAttribute('key');
            el.textContent = lang[0][attr][key]
          })
        }

        fetch("../langs.json")
        .then(res => res.json())
        .then(data => {
          
          translateMult(linksL, data);
          translateMult(linksR, data);
          translateMult(p, data);
          translateMult(btn, data);
          translateMult(view, data);
          translateMult(h2, data);
          translate(order, data);
          translate(h1, data);
        })
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    toggleMenu();
    langChange();
  })
})();