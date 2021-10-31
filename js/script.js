(() => {
  const langs = document.querySelectorAll('.langs li, .ham-langs li');
  const linksL = document.querySelectorAll('header .left a, .menu a');
  const linksR = document.querySelectorAll('header .right a');
  const btn = document.querySelectorAll('.mainBtn'); 
  const view = document.querySelectorAll('.menus');
  const h2 = document.querySelectorAll('.caption');
  const description = document.querySelectorAll('.desc'); 
  const span = document.querySelectorAll('span');
  const h3 = document.querySelectorAll('h3'); 
  const inputName = document.querySelector('.name'); 
  const inputEmail = document.querySelector('.email'); 
  const textarea = document.querySelector('textarea'); 
  const order = document.querySelector('.order');
  const h1 = document.querySelector('h1'); 
  const navMenu = document.querySelector('.bottom-bar'); 
  const menuLinks = document.querySelectorAll('.bottom-bar a');
  const logo = document.querySelector('.logo'); 
  const submit = document.querySelector('form .mainBtn');
  const formInfo = document.querySelectorAll('.add-text');
  const langsData = "https://my-json-server.typicode.com/HNatalia/data-api/langs";

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
      el.textContent = langData[lang][key];

      if (lang !== 'ru' && selector === span) {
        navMenu.classList.remove('ru');
        logo.style.margin = '0 auto';

        span.forEach(el => {
          el.classList.remove('ru');
        })

        menuLinks.forEach(el => {
          el.classList.remove('ru');
        })
      } 

      if (lang === 'ru' && selector === span) {
        span.forEach(el => {
          if (el.getAttribute('key')) {
            el.classList.add('ru');
          }
        });

        navMenu.classList.add('ru');
        logo.style.margin = '0 35px';

        menuLinks.forEach(el => {
          el.classList.add('ru');
        })
      } 
    })
  }

  const translate = (selector, langData, lang) => {
    const key = selector.getAttribute('key');
    selector.textContent = langData[lang][key]
    if (selector === inputName || inputEmail || textarea) {
      selector.setAttribute('placeholder', `${langData[lang][key]}`)
    }
  }

  const getSessionStorage = () => {
    if (sessionStorage.getItem('langs')) {
      const language = JSON.parse(sessionStorage.getItem('langs'))

      langs.forEach(el => {
        if (el.getAttribute('id') === language) {
          removeActiveLang();
          el.classList.add('active')
        }
      })

      fetch(langsData)
        .then(res => res.json())
        .then(data => {
          
          translateMult(linksL, data, language);
          translateMult(linksR, data, language);
          translateMult(description, data, language);
          translateMult(btn, data, language);
          translateMult(view, data, language);
          translateMult(h2, data, language);
          translateMult(span, data, language);
          translateMult(h3, data, language);
          translate(order, data, language);
          translate(inputName, data, language);
          translate(inputEmail, data, language);
          translate(textarea, data, language);
          translate(h1, data, language);
        })
    }
  }

  const langChange = () => {   
    langs.forEach(el => {
      el.addEventListener('click', () => {
        removeActiveLang();
        const attr = el.getAttribute('id');

        Array.from(langs)
        .filter(el => el.getAttribute('id') === attr)
        .map(el => el.classList.add('active'));

        sessionStorage.setItem('langs', JSON.stringify(attr));
        sessionStorage.setItem('active', JSON.stringify(attr));

        fetch(langsData)
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
          translate(inputName, data, attr);
          translate(inputEmail, data, attr);
          translate(textarea, data, attr);
          translate(h1, data, attr);
          formValidation();
        })
      });
    });
  }

  const formValidation = () => {
    formInfo.forEach(el => {
      const attr = el.getAttribute('placeholder');
      el.value = '';

      el.addEventListener('click', () => {
        el.setAttribute('placeholder', '');
      })

      el.addEventListener('blur', () => {
        el.setAttribute('placeholder', attr);
      })
    })

    submit.addEventListener('click', e => {
      e.preventDefault();

      const reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      if (inputName.value === '') {
        inputName.classList.add('invalid');
      } else {
        inputName.classList.remove('invalid');
        inputName.classList.add('valid');
      }
      
      if (!reEmail.test(inputEmail.value)) {
        inputEmail.classList.add('invalid');
      } else {
        inputEmail.classList.remove('invalid');
        inputEmail.classList.add('valid');
      }

      if (textarea.value === '') {
        textarea.classList.add('invalid');
      } else {
        textarea.classList.remove('invalid');
        textarea.classList.add('valid');
      }

      formInfo.forEach(el => {
        console.log(formInfo.length)
        if (el.classList.contains('valid')) {
          console.log('yes')
        } else {
          return;
        }
      })

      // const dataValues = [inputName.value, inputEmail.value, textarea.value];
      // console.log(dataValues)
      // const data = dataValues
      //   .reduce((acc, input) => ({
      //     ...acc,
      //     [input.id]: input.value
      //   }), {});
      
      // return data;
    })
  }

  getSessionStorage();

  const productsAppear = selector => {
    const container = document.querySelector(selector);
    const distance = container.getBoundingClientRect().top;
    const windowSize = window.innerHeight / 1.5;

    if (windowSize > distance) {
      container.classList.add('appear');
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    toggleMenu();
    langChange();
    formValidation();

    window.addEventListener('scroll', () => {
      productsAppear('.products-container');
      productsAppear('#choose .wrapper');
    })
  });
})();


// add animations
// send form to email, validate form

