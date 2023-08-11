function accordion() {
  const acc = document.getElementsByClassName("accordion");
  const panels = document.getElementsByClassName("panel");
  
  for (let i = 0; i < acc.length; i+=1) {
    acc[i].addEventListener("click", function a() {
      for (let j = 0; j < acc.length; j+=1) {
        if (j !== i) {
          acc[j].classList.remove("active");
          panels[j].style.maxHeight = null;
        }
      }
      
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  }
}

export default accordion;
