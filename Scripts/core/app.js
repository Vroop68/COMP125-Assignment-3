// John Knoop 300835103 - COMP125 - Assignment 3

// core module - IIFE
(function() {
  // App variables
  let XHR;
  let hash;
  let addressBook;
  let Contacts;
  let paragraphs;

  /**
   * This function inserts HTML from a file or other location
   * into the specificied tag / element that exists on the
   * index.html page
   *
   * @param {string} sourceURL
   * @param {string} destTag
   */
  function insertHTML(sourceURL, destTag) {
    let target = document.querySelector(destTag);

    XHR = new XMLHttpRequest();
    XHR.addEventListener("readystatechange", function() {
      if (this.status === 200) {
        if (this.readyState === 4) {
          target.innerHTML = this.responseText;
          setActiveNavLink();
        }
      }
    });
    XHR.open("GET", sourceURL);
    XHR.send();
  }

  //parses the paragraphs file
  function loadParagraphs() {
    XHR = new XMLHttpRequest();
    XHR.addEventListener("readystatechange", function() {
      if (this.status === 200) {
        if (this.readyState === 4) {
          paragraphs = JSON.parse(this.responseText);
          for (const property in paragraphs) {
            if (paragraphs.hasOwnProperty(property)) {
              let paragraphDiv;
              //switch case for figuring out which paragraph data is injected into what page
              switch (property) {
                case "homeParagraph":
                  paragraphDiv = document.getElementById("homePara");
                  break;

                case "contactParagraph":
                  paragraphDiv = document.getElementById("contactPara");
                  break;

                case "aboutParagraph":
                  paragraphDiv = document.getElementById("aboutPara");
                  break;

                default:
                  break;
              }
              if (paragraphDiv) {
                let newItem = document.createElement("p");
                newItem.textContent = paragraphs[property];
                paragraphDiv.appendChild(newItem);
              }
            }
          }
        }
      }
    });
    XHR.open("GET", "/paragraphs.json");
    XHR.send();
  }

  /**
   * This function is used for Intialization
   */
  function Start() {
    console.log(
      `%c App Initializing...`,
      "font-weight: bold; font-size: 20px;"
    );

    Main();
  }

  function Main() {
    console.log(`%c App Started...`, "font-weight: bold; font-size: 20px;");

    insertHTML("/Views/partials/header.html", "header");

    setPageContent("/Views/content/home.html");

    insertHTML("/Views/partials/footer.html", "footer");

    loadParagraphs();
  }

  function setPageContent(url) {
    insertHTML(url, "main");
  }

  function Route() {
    // sanitize the url - remove the #
    hash = location.hash.slice(1);

    document.title = hash;

    // change the URL of my page
    history.pushState("", document.title, "/" + hash.toLowerCase() + "/");

    setPageContent("/Views/content/" + hash.toLowerCase() + ".html");
    loadParagraphs();
  }

  function setActiveNavLink() {
    // clears the "active" class from each of the list items in the navigation
    document.querySelectorAll("li.nav-item").forEach(function(listItem) {
      listItem.setAttribute("class", "nav-item");
    });

    // add the "active" class to the class attribute of the appropriate list item
    document.getElementById(document.title).classList.add("active");
  }

  window.addEventListener("load", Start);

  window.addEventListener("hashchange", Route);
})();
