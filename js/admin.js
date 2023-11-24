const firebaseConfig = {
    apiKey: "AIzaSyDnehhm21YlsElh5iJUSAHcCksWi_Wh-2k",
    authDomain: "drone-3cf37.firebaseapp.com",
    databaseURL:"https://drone-3cf37-default-rtdb.firebaseio.com/",
    projectId: "drone-3cf37",
    storageBucket: "drone-3cf37.appspot.com",
    messagingSenderId: "531675435134",
    appId: "1:531675435134:web:a6b25cee8559afbd37082f",
    measurementId: "G-87NCY5XWRB"
  };
  
 
  firebase.initializeApp(firebaseConfig);

  var droneDB = firebase.database().ref("Drone");
  var storageRef = firebase.storage().ref();

  document.getElementById("myData").addEventListener("submit", submitForm);

  function handleFileSelect(event) {
    const file = event.target.files[0]; // Get the selected file
    const imgRef = storageRef.child(`images/${file.name}`); // Set a reference to the storage location

    // Upload the file
    imgRef.put(file).then((snapshot) => {
      console.log("Image uploaded successfully");
      // Get the download URL of the uploaded file
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        // Set the value of the "img" input field to the download URL
        document.getElementById("img").value = downloadURL;
      });
    }).catch((error) => {
      console.error("Error uploading image:", error);
    });
  }

  function submitForm(e) {
    e.preventDefault();

    var title = getElementVal("title");
    var text = getElementVal("text");
    var img = getElementVal("img");

    saveMessage(title, text, img);

    document.getElementById("title").value = "";
    document.getElementById("text").value = "";
    document.getElementById("img").value = "";
  }

  const saveMessage = (title, text, img) => {
    var newDrone = droneDB.push();
    newDrone.set({
      title: title,
      text: text,
      img: img,
    });
  }

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }

  const dbRef = firebase.database().ref("Drone");
  dbRef.once("value", function (snapshot) {
    const data = snapshot.val();
    const news = document.getElementById("news");
    let toggledCard = null;

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const item = data[key];
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const image = document.createElement("img");
        const card = document.createElement("div");
        const deleteBtn = document.createElement("button");
        card.className = "card";
        h2.textContent = item.title;
        p.textContent = item.text;
        image.src = item.img;
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "deleteBtn";
        card.appendChild(h2);
        card.appendChild(p);
        card.appendChild(deleteBtn);
        news.appendChild(card);

        card.addEventListener("click", () => {
          if (toggledCard !== null && toggledCard !== card) {
            toggledCard.classList.remove("open");
          }
          card.classList.toggle("open");
          toggledCard = card;
        });

        deleteBtn.addEventListener("click", () => {
          dbRef.child(key).remove();
          card.remove();
        });
      }
    }
  });