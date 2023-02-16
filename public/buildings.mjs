let table = document.querySelectorAll(".data")[0];
table.style.display = "none";
let table2 = document.querySelectorAll(".data2")[0];
table2.style.display = "none";
let data = new Array();
for (let row of table.rows){
    let l=new Array();;
    for (let cell of row.cells){
        l.push(cell.textContent);
    }
    data.push(l);
}
let data2 = new Array();
for (let row of table2.rows){
    let l=new Array();;
    for (let cell of row.cells){
        l.push(cell.textContent);
    }
    data2.push(l);
}
let building1 = new Array();
let building2 = new Array();
let building3 = new Array();
for (let i of data){
    if (i[0]=="1"){
        building1.push(i);
    }
    else if (i[0]=="2"){
        building2.push(i);
    }
    else if (i[0]=="3"){
        building3.push(i);
    }
}
let building12 = new Array();
let building22 = new Array();
let building32 = new Array();
for (let i of data2){
    if (i[0]=="1"){
        building12.push(i);
    }
    else if (i[0]=="2"){
        building22.push(i);
    }
    else if (i[0]=="3"){
        building32.push(i);
    }
}
let getFloorCount = function(table){
    let counter =0;
    let floor =0;
    for(let i of table){
        if(floor != i[1]){
            floor = i[1];
            counter ++;
        }
    }
    return counter;
}
let getRoomCount = function(table, floor){
    let counter =0;
    let room =0;
    for(let i of table){
        if(room != i[2] && (floor+parseInt(table[0][1])-1) == i[1]){
            room = i[2];
            counter ++;
        }
    }
    return counter;
}
let getSensorCount = function(table, floor, room){
    let counter = 0;
    let sensor = 0;
    let c=parseInt(table[0][2])-1;
    let f = floor + parseInt(table[0][1])-1;
    //find c = roomid = roomId tou prwtou dwatiou tou orofou + room
    for(let i of table){
        if((f+1) == i[1]){
            c = parseInt(i[2]) + parseInt(room);
            break; 
        }
    }
    for (let i of table){
        if(sensor !=i[3] && (f+1) == i[1] && i[2] == c){
            sensor=i[3];
            counter++;
        }
    }
    return [counter,sensor];
}
let getDeviceCount = function(table, floor, room){
    let counter = 0;
    let sensor = 0;
    let c=parseInt(table[0][2])-1;
    let f = floor + parseInt(table[0][1])-1;
    //find c = roomid = roomId tou prwtou dwatiou tou orofou + room
    for(let i of table){
        if((f+1) == i[1]){
            c = parseInt(i[2]) + parseInt(room);
            break; 
        }
    }
    for (let i of table){
        let d=0;
        if(i[4]!='0'){
            d=i[4];
        }
        else if(i[6]!='0'){
            d=i[6];
        }
        else if(i[8]!='0'){
            d= i[8];
        }
        else if(i[9]!='0'){
            d=i[9]
        }
        if(sensor !=d && (f+1) == i[1] && i[2] == c){
            sensor=d;
            counter++;
        }
        // console.log("    "  +d,sensor);
    }
    return [counter,sensor];
}
let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let bt1 = document.querySelectorAll(".text1")[0];
let bt2 = document.querySelectorAll(".text2")[0];
let bt3 = document.querySelectorAll(".text3")[0];
let clck1 = false;
let clck2 = false;
let clck3 = false;
bt1.addEventListener('click', () => {
    if (!clck1){
        if(clck2){
            removeb2();
            clck2 =false;
        }
        if(clck3){
            removeb3();
            clck3 =false;
        }
        appendb1();
        clck1 = true;
    }
    else{
        removeb1();
        clck1 =false;
    }
});
bt2.addEventListener('click', () => {
    if (!clck2){
        if(clck1){
            removeb1();
            clck1 =false;
        }
        if(clck3){
            removeb3();
            clck3 =false;
        }
        appendb2();
        clck2 = true;
    }
    else{
        removeb2();
        clck2 =false;
    }
});
bt3.addEventListener('click', () => {
    if (!clck3){
        if(clck2){
            removeb2();
            clck2 =false;
        }
        if(clck1){
            removeb1();
            clck1 =false;
        }
        appendb3();
        clck3 = true;
    }
    else{
        removeb3();
        clck3 =false;
    }
});

let appendb1 = function(){
    let floors = document.createElement("div");
    floors.className = "floors";
    floors.style.display = "flex";
    floors.style.flexWrap = "wrap";
    floors.style.flexDirection = "column";
    let floor = [];
    let floorText = [];
    let floorClick =[];
    for(let i=0;i<getFloorCount(building1);i++){
        floor[i] = document.createElement("div");
        floor[i].className = "floor" + i;
        floor[i].style.paddingTop = "1%";
        floorText[i] = document.createElement("p");
        floorText[i].textContent = "Όροφος " + i + "   ►";
        floorText[i].style.paddingLeft = "3%";
        floorText[i].style.lineHeight = "1.1em";
        floorText[i].style.fontSize = "0.9em";
        floorText[i].style.cursor = "pointer";
        floorClick[i] = false;
        floorText[i].addEventListener("click",()=>{
            if(!floorClick[i]){    
                floorClick[i] =true;
                // let c = document.createElement("h1");
                // c.textContent = "hii";
                // c.className = "room1";
                // floor[i].appendChild(c);
                for(let j=0;j<floorText.length;j++){
                    if(i==j){
                        continue;
                    }
                    else{
                        if(floorClick[j]){
                            floorClick[j] = false;
                            removef1(j);
                            floorText[j].textContent = "Όροφος " + i + "   ►";
                        }
                        
                    }
                }
                appendf1(i,building1,building12);
                floorText[i].textContent = "Όροφος " + i + "   ▼";
            }
            else{
                floorClick[i] = false;
                removef1(i);
                floorText[i].textContent = "Όροφος" + i + "   ►";
            }
        })
        floor[i].appendChild(floorText[i]);
        floors.appendChild(floor[i]);
    }
    b1.appendChild(floors);
}
let appendb2 = function(){
    let floors = document.createElement("div");
    floors.className = "floors";
    floors.style.display = "flex";
    floors.style.flexWrap = "wrap";
    floors.style.flexDirection = "column";
    let floor = [];
    let floorText = [];
    let floorClick =[];
    for(let i=0;i<getFloorCount(building2);i++){
        floor[i] = document.createElement("div");
        floor[i].className = "floor" + i;
        floor[i].style.paddingTop = "1%";
        floorText[i] = document.createElement("p");
        floorText[i].textContent = "Όροφος " + i + "   ►";
        floorText[i].style.paddingLeft = "3%";
        floorText[i].style.lineHeight = "1.1em";
        floorText[i].style.fontSize = "0.9em";
        floorText[i].style.cursor = "pointer";
        floorClick[i] = false;
        floorText[i].addEventListener("click",()=>{
            if(!floorClick[i]){    
                floorClick[i] =true;
                // let c = document.createElement("h1");
                // c.textContent = "hii";
                // c.className = "room1";
                // floor[i].appendChild(c);
                for(let j=0;j<floorText.length;j++){
                    if(i==j){
                        continue;
                    }
                    else{
                        if(floorClick[j]){
                            floorClick[j] = false;
                            removef1(j);
                            floorText[j].textContent = "Όροφος" + i + "   ►";
                        }
                        
                    }
                }
                appendf1(i,building2,building22);
                floorText[i].textContent = "Όροφος" + i + "   ▼";
            }
            else{
                floorClick[i] = false;
                removef1(i);
                floorText[i].textContent = "Όροφος" + i + "   ►";
            }
        })
        floor[i].appendChild(floorText[i]);
        floors.appendChild(floor[i]);
    }
    b2.appendChild(floors);
}
let appendb3 = function(){
    let floors = document.createElement("div");
    floors.className = "floors";
    floors.style.display = "flex";
    floors.style.flexWrap = "wrap";
    floors.style.flexDirection = "column";
    let floor = [];
    let floorText = [];
    let floorClick =[];
    for(let i=0;i<getFloorCount(building3);i++){
        floor[i] = document.createElement("div");
        floor[i].className = "floor" + i;
        floor[i].style.paddingTop = "1%";
        floorText[i] = document.createElement("p");
        floorText[i].textContent = "Όροφος " + i + "   ►";
        floorText[i].style.paddingLeft = "3%";
        floorText[i].style.lineHeight = "1.1em";
        floorText[i].style.fontSize = "0.9em";
        floorText[i].style.cursor = "pointer";
        floorClick[i] = false;
        floorText[i].addEventListener("click",()=>{
            if(!floorClick[i]){    
                floorClick[i] =true;
                // let c = document.createElement("h1");
                // c.textContent = "hii";
                // c.className = "room1";
                // floor[i].appendChild(c);
                for(let j=0;j<floorText.length;j++){
                    if(i==j){
                        continue;
                    }
                    else{
                        if(floorClick[j]){
                            floorClick[j] = false;
                            removef1(j);
                            floorText[j].textContent = "Όροφος" + i + "   ►";
                        }
                        
                    }
                }
                appendf1(i,building3,building32);
                floorText[i].textContent = "Όροφος" + i + "   ▼";
            }
            else{
                floorClick[i] = false;
                removef1(i);
                floorText[i].textContent = "Όροφος" + i + "   ►";
            }
        })
        floor[i].appendChild(floorText[i]);
        floors.appendChild(floor[i]);
    }
    b3.appendChild(floors);
}

let removeb1 = function(){
    let c = document.querySelectorAll(".floors")[0];
    c.parentElement.removeChild(c);
}
let removeb2 = function(){
    let c = document.querySelectorAll(".floors")[0];
    c.parentElement.removeChild(c);
}
let removeb3 = function(){
    let c = document.querySelectorAll(".floors")[0];
    c.parentElement.removeChild(c);
}

let appendf1 = function(i,table,table2){
    let t = ".floor" + i;
    let floor = document.querySelectorAll(t)[0];
    let room = []
    let roomText = [];
    let roomClick = [];
    let rooms = document.createElement("div");
    rooms.className = "rooms";
    rooms.style.display = "flex";
    rooms.style.flexWrap = "wrap";
    rooms.style.flexDirection = "column";
    for(let j=0;j<getRoomCount(table,(i+1));j++){
        room[j] = document.createElement("div");
        room[j].className = "room" + j;
        room[j].paddingTop = "1.5%";
        roomText[j] = document.createElement("p");
        roomText[j].textContent = "Δωμάτιο " + (j+1) + "   ►";
        roomText[j].style.paddingLeft = "7%";
        roomText[j].style.cursor = "pointer";
        roomClick[j] = false;
        roomText[j].addEventListener("click",()=>{
            if(!roomClick[j]){
                roomClick[j]=true;
                //remove all  other room  sensors
                for(let k=0;k<roomText.length;k++){
                    if(k==j){
                        continue;
                    }
                    else{
                        if(roomClick[k]){
                            roomClick[k] = false;
                            removes1(k);
                            removed1(k);
                            roomText[k].textContent = "Δωμάτιο " + (j+1) + "   ►";
                        }
                    }
                }
                //append
                appends1(j,i,table,table2);
                roomText[j].textContent = "Δωμάτιο " + (j+1) + "   ▼";
            }
            else{
                roomClick[j]=false;
                //remove
                removes1(j);
                removed1(j);
                roomText[j].textContent = "Δωμάτιο " + (j+1) + "   ►";
            }
        })
        room[j].appendChild(roomText[j]);
        rooms.appendChild(room[j]);
    }
    floor.appendChild(rooms);
}

let removef1 = function(i){
    let p = document.querySelectorAll(".rooms")[0];
    p.parentElement.removeChild(p);
}

let appends1 = function(i,k,table,table2){
    let t = ".room" +i;
    let room  = document.querySelectorAll(t)[0];
    let sensors = document.createElement("div");
    sensors.className = "sensors";
    let sensor = [];
    let sensorText = [];
    let sensorClick = [];
    for(let j=0;j<getSensorCount(table,k,i)[0];j++){
        sensor[j] = document.createElement("div");
        sensor[j].className = "sensor"+ j;
        sensorClick[j]=false;
        sensorText[j] = document.createElement("p");
        //6789
        let text = '';
        let v = getSensorCount(table,k,i)[1] - getSensorCount(table,k,i)[0] +j - table[0][3]+1;
        if(table[v][6]!='0'){
            text = "• Αισθητήρας Ποιότητας Αέρα: "
        }
        else if (table[v][7]!='0'){
            text = "• Αισθητήρας Ενέργειας: "
        }
        else if (table[v][8]!='0'){
            text = "• Αισθητήρας Φωτεινότητας: "
        }
        else if (table[v][9]!='0'){
            text = "• Αισθητήρας Θερμοκρασίας: "
        }
        sensorText[j].textContent = text + table[v][4]+  "  (Battery Level: " + table[v][5]+ ")"
        sensorText[j].style.paddingLeft = "10%";
        sensor[j].appendChild(sensorText[j]);
        sensors.appendChild(sensor[j]);
    }
    let devices = document.createElement("div");
    devices.className = "devices";
    let device = [];
    let deviceText = [];
    let deviceClick = [];
    for(let j=0;j<getDeviceCount(table2,k,i)[0];j++){
        device[j] = document.createElement("div");
        device[j].className = "device"+ j;
        deviceClick[j]=false;
        deviceText[j] = document.createElement("p");
        device[j].appendChild(deviceText[j]);
        let text = '';
        let buttons = document.createElement("div");
        buttons.className = "button";
        buttons.style.paddingLeft= "10%";
        let input  = document.createElement("input");
        let input2 = document.createElement("input");
        let v = getDeviceCount(table2,k,i)[1] - getDeviceCount(table2,k,i)[0] +j - table2[0][4]+1;
        input.type = "checkbox";
        if (table2[v][3] == '0') {
            input.checked = "false";
        }
        else if (table2[v][3] == '1'){
            input.checked = "true";
        }
        if(table2[v][4]!='0'){
            text = "• AC   ";
            input2.className = "heat"
            input2.type = "range";
            input2.min = "15";
            input2.max = "35";
            buttons.appendChild(input2);
            if (table2[v][5] = '0'){
                text += "Status: Cooling";
            }
            else if (table2[v][5] = '1'){
                text += "Status: Heating";
            }
            input.id = parseInt(table2[v][4]);
        }
        else if (table2[v][6]!='0'){
            text = "• Επίπεδο φωτός: "+table[v][7];
            input2.className = "light";
            input2.type = "range";
            input2.min = "100";
            input2.max = "1500";   
            buttons.appendChild(input2);
            input.id = table2[v][6];  
        }
        else if (table2[v][8]!='0'){
            text = "• Πρίζα ";
            input.id = parseInt(table2[v][8]);
        }
        else if (table2[v][9]!='0'){
            text = "• Εξαερισμός ";
            input.id = parseInt(table2[v][9]);
        }
        buttons.appendChild(input);
        deviceText[j].textContent = text
        deviceText[j].style.paddingLeft = "10%";        
        devices.appendChild(device[j]);
        devices.appendChild(buttons);
    }
    let submit = document.createElement("input");
    submit.type = "submit";
    submit.style.marginLeft="10%";

    submit.addEventListener("click", () =>{
        let vl = document.querySelectorAll(".button");
        let val = new Array();
        for(let i of vl){
            let l = new Array();
            if(i.childNodes[1]){
                l.push(i.childNodes[1]);
                l.push(i.childNodes[0]);
            }
            else{
                l.push(i.childNodes[0]);
                l.push('0');
            }
            val.push(l);
        }
        let newval = new Array();
        for (let i of val){
            let x = i[0].id;
            let y =0;
            if (i[0].checked){
                 y = 1;
            }
            let z =0;
            if(i[1]!='0'){
                z = i[1].value;
            }
            newval.push([x,y,z]);
            console.log(newval);
            fetch('/update-devices/'+x+'/'+y+'/'+z).then((response) => { response.json().then(result => console.log(result))});
        }
    })

    devices.appendChild(submit);
    devices.append(document.createElement("p"));
    room.append(devices);
    room.append(sensors);
}
let removes1 = function(i){
    let p = document.querySelectorAll(".sensors")[0];
    p.parentElement.removeChild(p);
}
let removed1 = function(i){
    let p = document.querySelectorAll(".devices")[0];
    p.parentElement.removeChild(p);
}