const pop_up = () =>{
  alert("kiyokiyo2929@gmail.com")
  }

// works page photo  
const btn_1 = () => {
  console.log('click')
  const photo_id_visible = document.getElementById("photo_1");
  const photo_id_invisible1 = document.getElementById("photo_2");
  const photo_id_invisible2 = document.getElementById("photo_3");
  const thumbnail_visible = document.getElementById("thumbnail_1");
  const thumbnail_invisible1 = document.getElementById("thumbnail_2");
  const thumbnail_invisible2 = document.getElementById("thumbnail_3");

  if( photo_id_visible.classList.contains("invisible")){
    photo_id_visible.classList.remove("invisible")
    photo_id_visible.classList.add("visible")
    thumbnail_visible.classList.remove("invisible_")
    thumbnail_visible.classList.add("visible_")
  } else {
    photo_id_visible.classList.add("visible")
    thumbnail_visible.classList.add("visible_")
  }

  if(photo_id_invisible1.classList.contains("visible")){
    photo_id_invisible1.classList.remove("visible")
    photo_id_invisible1.classList.add("invisible")
    thumbnail_invisible1.classList.remove("visible_")
    thumbnail_invisible1.classList.add("invisible_")
  }
  if(photo_id_invisible2.classList.contains("visible")){
    photo_id_invisible2.classList.remove("visible")
    photo_id_invisible2.classList.add("invisible")
    thumbnail_invisible2.classList.remove("visible_")
    thumbnail_invisible2.classList.add("invisible_")
  }
}

const btn_2 = () => {
  const photo_id_invisible1 = document.getElementById("photo_1");
  const photo_id_visible = document.getElementById("photo_2");
  const photo_id_invisible2 = document.getElementById("photo_3");
  const thumbnail_invisible1 = document.getElementById("thumbnail_1");
  const thumbnail_visible = document.getElementById("thumbnail_2");
  const thumbnail_invisible2 = document.getElementById("thumbnail_3");

  if( photo_id_visible.classList.contains("invisible")){
    photo_id_visible.classList.remove("invisible")
    photo_id_visible.classList.add("visible")
    thumbnail_visible.classList.remove("invisible_")
    thumbnail_visible.classList.add("visible_")
  } else {
    photo_id_visible.classList.add("visible")
    thumbnail_visible.classList.add("visible_")
  }

  if(photo_id_invisible1.classList.contains("visible")){
    photo_id_invisible1.classList.remove("visible")
    photo_id_invisible1.classList.add("invisible")
    thumbnail_invisible1.classList.remove("visible_")
    thumbnail_invisible1.classList.add("invisible_")
  }
  if(photo_id_invisible2.classList.contains("visible")){
    photo_id_invisible2.classList.remove("visible")
    photo_id_invisible2.classList.add("invisible")
    thumbnail_invisible2.classList.remove("visible_")
    thumbnail_invisible2.classList.add("invisible_")
  }
}

const btn_3 = () => {
  const photo_id_invisible1 = document.getElementById("photo_1");
  const photo_id_invisible2 = document.getElementById("photo_2");
  const photo_id_visible = document.getElementById("photo_3");
  const thumbnail_invisible1 = document.getElementById("thumbnail_1");
  const thumbnail_invisible2 = document.getElementById("thumbnail_2");
  const thumbnail_visible = document.getElementById("thumbnail_3");

  if( photo_id_visible.classList.contains("invisible")){
    photo_id_visible.classList.remove("invisible")
    photo_id_visible.classList.add("visible")
    thumbnail_visible.classList.remove("invisible_")
    thumbnail_visible.classList.add("visible_")
  } else {
    photo_id_visible.classList.add("visible")
    thumbnail_visible.classList.add("visible_")
  }

  if(photo_id_invisible1.classList.contains("visible")){
    photo_id_invisible1.classList.remove("visible")
    photo_id_invisible1.classList.add("invisible")
    thumbnail_invisible1.classList.remove("visible_")
    thumbnail_invisible1.classList.add("invisible_")
  }
  if(photo_id_invisible2.classList.contains("visible")){
    photo_id_invisible2.classList.remove("visible")
    photo_id_invisible2.classList.add("invisible")
    thumbnail_invisible2.classList.remove("visible_")
    thumbnail_invisible2.classList.add("invisible_")
  }
}