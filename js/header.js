class HeaderLogic
{
  constructor(element)
  {
    this.element = element;
  }

  remove(target_class)
  {
    this.element.classList.remove(target_class);
  }

  add(target_class)
  {
    this.element.classList.add(target_class);
  }

  contains(target_class)
  {
    return this.element.classList.contains(target_class);
  }

  toggle_classes(remove_class, add_class)
  {
    this.remove(remove_class);
    this.add(add_class);
  }

  multiplyAdd(secondElement, target_class , second_class)
  {
    this.add(target_class);
    secondElement.classList.add(second_class);
  }
  
  multiplyRemove(secondElement, target_class , second_class)
  {
    this.remove(target_class);
    secondElement.classList.remove(second_class);
  }


}


let mnue = document.querySelector(".fa-bars");
let closeMnue = document.querySelector(".fa-xmark");
let list = document.querySelector("ul.list");


let listControlar = new HeaderLogic(list);
let mnueControlar = new HeaderLogic(mnue);
let closeMnueControlar = new HeaderLogic(closeMnue);

// ======================================= Add event Click when user Click on mnue  ======================================= 

// ======================================= Create Function To call it when window resize and window.width < 768  ======================================= 

function controlMnue()
{

  // ======================================= active click button to open mnue  ======================================= 

  mnue.addEventListener("click", _ =>
  {

    // list.classList.add("active_mnue");
    listControlar.add("active_mnue");

    if (list.classList.contains("active_mnue"))
    {

      listControlar.remove("hidden_mnue");

      mnueControlar.toggle_classes("showStyle", "hiddenStyle");

      closeMnueControlar.toggle_classes("hiddenStyle", "showStyle");

    }

  });
  //======================================= active click button to close mnue  ======================================= 

  closeMnue.addEventListener("click", _ =>
  {

    listControlar.add("hidden_mnue");

    if (listControlar.contains("hidden_mnue"))
    {

      listControlar.remove("active_mnue");

      closeMnueControlar.toggle_classes("showStyle", "hiddenStyle");

      mnueControlar.toggle_classes("hiddenStyle", "showStyle");

    }

  });
};

// ======================================= Calling Function To Set icones  ======================================= 

controlMnue();

// ======================================= Create Event When Window Resize  ======================================= 

const controlResize = () =>
{
  window.addEventListener("resize", function ()
  {
    if (window.innerWidth >= 991)
    {

      listControlar.multiplyRemove(mnue , "hidden_mnue" , "showStyle");
      closeMnueControlar.remove("showStyle");

    } else if (listControlar.contains("active_mnue")) closeMnueControlar.add("showStyle");
  });
}
controlResize();


// ======================================= Stup Loader  ======================================= 

function loader()
{
  const loaderEle = document.querySelector(".load");

  document.body.style.overflowY = "hidden";

  window.addEventListener("load", function ()
  {
    loaderEle.remove();
    document.body.style.overflowY = "visible";
  });

};

loader();


// ======================================= Start Toggle theme  ======================================= 


class ThemeLogic extends HeaderLogic
{
  constructor(element, contains, add, remove , multiplyAdd , multiplyRemove)
  {
    super(contains, add, remove , multiplyAdd , multiplyRemove);
    this.element = element;
  }

  toggle(target_class)
  {
    this.element.classList.toggle(target_class);
  }

}

toggleTheme();

function toggleTheme()
{

  let theme = document.querySelector(".theme");
  let bodyStyle = document.querySelector("body");
  let resultBackground = document.querySelectorAll(".result");

  const themeControlar = new ThemeLogic(theme);
  const bodyStyleControlar = new ThemeLogic(bodyStyle);

  if (theme != null)
  {
    theme.addEventListener("click", _ =>
    {

      //=======================================  Set toggle Class To Change Theme  ======================================= 

      bodyStyleControlar.toggle("whiteTheme");
      themeControlar.toggle("themeToggle");

      // ======================================= Loop For Results Div to Add Themes   ======================================= 

      resultBackground.forEach(div => div.classList.toggle("toggle-background"));

      // ======================================= put Color On LocalStorage  ======================================= 

      bodyStyleControlar.contains("whiteTheme") && themeControlar.contains("themeToggle") ? localStorage.setItem("themesClasses", "contains") : localStorage.removeItem("themesClasses", "contains")

    });

    // =======================================  Check If LocalStroage Have A Color Or Not ======================================= 

    localStorage.getItem("themesClasses") ? bodyStyleControlar.multiplyAdd(theme, "whiteTheme", "themeToggle") : bodyStyleControlar.multiplyRemove(theme, "whiteTheme", "themeToggle");

  };


};

function upScrollBtn() {
    let btn_click = document.querySelector(".scroll");
    window.onscroll = _ => this.window.scrollY >= 800 ? btn_click.classList.add("active") : btn_click.classList.remove("active");
    btn_click.addEventListener("click" , _ => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
};

if (window.location.pathname.includes("Reference")) upScrollBtn();