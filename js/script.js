(() => {

  const langs = document.querySelectorAll('.langs li');
  const linksL = document.querySelectorAll('header .left a');
  const linksR = document.querySelectorAll('header .right a');
  const btn = document.querySelectorAll('.mainBtn'); 
  const view = document.querySelectorAll('.menus');
  const h2 = document.querySelectorAll('.caption');
  const description = document.querySelectorAll('.desc'); 
  const span = document.querySelectorAll('span');
  const h3 = document.querySelectorAll('h3'); 
  const order = document.querySelector('.order');
  const h1 = document.querySelector('h1'); 

  console.log(span)


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

  const removeActiveLang = () => {
    langs.forEach(el => {
      el.classList.remove('active');
    });
  }

  const translateMult = (selector, langData, lang) => {
    selector.forEach(el => {
      const key = el.getAttribute('key');
      el.textContent = langData[0][lang][key]
    })
  }

  const translate = (selector, langData, lang) => {
    const key = selector.getAttribute('key');
    selector.textContent = langData[0][lang][key]
  }

  const getLocalLang = () => {
    if (localStorage.getItem('langs')) {
      const language = JSON.parse(localStorage.getItem('langs'))

      langs.forEach(el => {
        if (el.getAttribute('id') === language) {
          removeActiveLang();
          el.classList.add('active')
        }
      })

      fetch("../langs.json")
        .then(res => res.json())
        .then(data => {
          
          translateMult(linksL, data, language);
          translateMult(linksR, data, language);
          translateMult(p, data, language);
          translateMult(btn, data, language);
          translateMult(view, data, language);
          translateMult(h2, data, language);
          translate(order, data, language);
          translate(h1, data, language);
        })
    }
  }

  const langChange = () => {   

    langs.forEach(el => {
      el.addEventListener('click', () => {
        removeActiveLang();
        el.classList.add('active');
        const attr = el.getAttribute('id');

        localStorage.setItem('langs', JSON.stringify(attr));
        localStorage.setItem('active', JSON.stringify(attr));

        fetch("../langs.json")
        .then(res => res.json())
        .then(data => {
          
          translateMult(linksL, data, attr);
          translateMult(linksR, data, attr);
          translateMult(description, data, attr);
          translateMult(btn, data, attr);
          translateMult(view, data, attr);
          translateMult(h2, data, attr);
          translateMult(span, data, attr);
          translateMult(h3, data, attr);
          translate(order, data, attr);
          translate(h1, data, attr);
        })
      });
    });
  }

  // getLocalLang();

  document.addEventListener("DOMContentLoaded", () => {
    toggleMenu();
    langChange();
  });
})();