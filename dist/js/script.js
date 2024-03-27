const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const game = document.querySelector("#game");

const body = document.body;

const urlImage = new Image();
urlImage.src = "../icons/star-icons/yellow-stars/one-star-yellow.svg";


const image = new Image();
image.src = "../img/map-bg/map-project.png";

const playerImageDown = new Image();
playerImageDown.src = "../icons/charates-icons/playerDown.png";

const playerImageLeft = new Image();
playerImageLeft.src = "../icons/charates-icons/playerLeft.png";

const playerImageUp = new Image();
playerImageUp.src = "../icons/charates-icons/playerUp.png";

const playerImageRight = new Image();
playerImageRight.src = "../icons/charates-icons/playerRight.png";

let playerImage = "";
playerImage = playerImageDown;


canvas.width = 1366;
canvas.height = 641;

const config = {
    image: image,
    x: -515,
    y: -230,
}

const configLevel = {
    maxWidthLevel: 300,
    widthUp: 0,
    countUp: 0 
}

let xRen = 0;
let yRen = 1;
let limited = 0;

const tabKeys = {
    w: { pressed: false }, s: { pressed: false }, a: { pressed: false }, d: { pressed: false },
}


class CharaterConfig {
    constructor ({ position, image, frames = {max: 1} }){
        this.position = position;
        this.image = image;
        this.frames = {...frames, value: 0, elapsed: 0};

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height / this.frames.max;
        }

        this.animate = false;
    }   

    draw(canvas){
        canvas.drawImage(
            this.image,
            this.frames.value * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )

        if(this.animate){
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
    
            if(this.frames.elapsed % 10 === 0){
                if(this.frames.value < this.frames.max - 1) this.frames.value++
                else this.frames.value = 0;
            }
        }  
    }
}

const charater = new CharaterConfig({
    position: {
        x: canvas.width / 2 - playerImage.width / 4 / 2,
        y: canvas.height / 2 - playerImage.height / 2
    },
    image: playerImage,
    frames: {
        max: 4
    },
    animate: false
});


function Sprite (image, x, y){
    canvasContext.drawImage(image, x, y);
}

// a: -695(x) and -200(y)


function animate(){
    window.requestAnimationFrame(animate);
    Sprite(config.image, config.x, config.y)
    charater.draw(canvasContext);
    if (tabKeys.w.pressed){
        config.y === -10 ? config.y += 0 : config.y += 5;
        charater.image = playerImageUp;
    } else if (tabKeys.a.pressed){
        config.x === -240 ? config.x += 0 : config.x += 5;
        charater.image = playerImageLeft;
    } else if (tabKeys.s.pressed) {
        config.y === -970 ? config.y -= 0 : config.y -= 5;
        charater.image = playerImageDown; 
    } else if (tabKeys.d.pressed) {
        config.x === -1885 ? config.x -= 0 : config.x -= 5;
        charater.image = playerImageRight;
    } 

    if(tabKeys.w.pressed || tabKeys.a.pressed || tabKeys.s.pressed || tabKeys.d.pressed){} 
    else { charater.image = playerImageDown ; charater.animate = false ; charater.frames.value = 0}
}
animate();


window.addEventListener('keydown', (e) =>{
    if(e.code === 'KeyW'){
        tabKeys.w.pressed = true;
    } else if (e.code === 'KeyS'){
        tabKeys.s.pressed = true;
    } else if (e.code === 'KeyA') {
        tabKeys.a.pressed = true;
    } else if (e.code === 'KeyD'){
        tabKeys.d.pressed = true;
    }

    if(e.code === "KeyW" || e.code === "KeyS" || e.code === "KeyA" || e.code === "KeyD"){
        charater.animate = true;
    }

})

window.addEventListener('keyup', (e) =>{
    if(e.code === 'KeyW'){
        tabKeys.w.pressed = false;
    } else if (e.code === 'KeyS'){
        tabKeys.s.pressed = false;
    } else if (e.code === 'KeyA') {
        tabKeys.a.pressed = false;
    } else if (e.code === 'KeyD'){
        tabKeys.d.pressed = false;
    }

    if(e.code === "KeyW" || e.code === "KeyS" || e.code === "KeyA" || e.code === "KeyD"){
        // charater.animate = false
        if((config.x <= -1440 && config.x >= -1730) && (config.y <= -120 && config.y >= -300)){
           
            limited += 1;
            if(limited < 2){
                configLevel.widthUp += 30;
                stateWidthActive(configLevel.widthUp);
                if(configLevel.widthUp >= configLevel.maxWidthLevel){
                    configLevel.widthUp = configLevel.maxWidthLevel - configLevel.widthUp;
                    configLevel.countUp++;
                   
                    upTextLevel(configLevel.countUp);
                    
                }
                renderBlockInventory("../icons/star-icons/yellow-stars/one-star-yellow.svg", document.querySelector(".inventory__wrapper"), xRen, yRen);
            } 
        } else {
            // if(limited != 0){
                limited = 0;
            // }
           
        }
    }
})


//1.0


function inventoryBtnRender(parent){
    const btnInventory = document.createElement('button');
    btnInventory.classList.add('game-inventory');
    btnInventory.innerHTML = `<img class="game-inventory-image" src="./icons/attribute-icons/inventory-icons/backpack-icon.svg" alt="btn-pause">`;
    parent.append(btnInventory);

    const imageInventory = document.querySelector(".game-inventory-image");

    btnInventory.addEventListener("mouseover", (e) => {    
        imageInventory.setAttribute("src", "./icons/attribute-icons/inventory-icons/backpack-active-icon.svg");      
    });
    btnInventory.addEventListener("mouseout", (e) => {    
        imageInventory.setAttribute("src", "./icons/attribute-icons/inventory-icons/backpack-icon.svg");      
    });

}
inventoryBtnRender(body);

function pauseBtnRender(parent){
    const btnPause = document.createElement('button');
    btnPause.classList.add('game-pause');
    btnPause.innerHTML = `<img class="game-pause-image" src="./icons/attribute-icons/btn-pause/btn-pause.svg" alt="btn-pause">`;
    parent.append(btnPause);

    const imageBtnPause = document.querySelector(".game-pause-image");

    btnPause.addEventListener("mouseover", (e) => {    
        imageBtnPause.setAttribute("src", "./icons/attribute-icons/btn-pause/btn-pause-active.svg");      
    });
    btnPause.addEventListener("mouseout", (e) => {    
        imageBtnPause.setAttribute("src", "./icons/attribute-icons/btn-pause/btn-pause.svg");      
    });

}

pauseBtnRender(body);


function levelUp(parent, widthLevel, count){
    const levelBlock = document.createElement("div");
    levelBlock.classList.add('wrapper');
    levelBlock.innerHTML = ` 
        <h4 class="wrapper__level">LEVEL <span id="countLevel">${count}</span></h4>
        <div class="wrapper__progress"></div>
    `;
    parent.append(levelBlock);

    const levelProgress = document.querySelector(".wrapper__progress");
    levelProgress.style.width = `${widthLevel}px`;
}

function stateWidthActive(widthLevel){
    const levelProgress = document.querySelector(".wrapper__progress");
    levelProgress.style.width = `${widthLevel}px`;
}

function upTextLevel(count){
    const countLevel = document.querySelector('#countLevel');
    countLevel.textContent = `${count}`;
}

levelUp(body, configLevel.widthUp, configLevel.countUp);




function menuGame(parent){
    const menuBlock = document.createElement('div');
    menuBlock.classList.add("menu");
    menuBlock.innerHTML = `
        <div class="menu__content">
            <div class="menu__content_title">SlickRub</div>

            <button class="menu__content_return btn">Play</button>
            <button class="menu__content_settings btn">Settings</button>
            <button class="menu__content_exit btn">Exit</button>
        </div>
    `;
    parent.append(menuBlock);
}


    const gamePauseBtn = document.querySelector('.game-pause');
    gamePauseBtn.addEventListener('click', (e) =>{
        menuGame(body);

        const gameBtnReturn = document.querySelector(".menu__content_return");
        if(gameBtnReturn){
            console.log(1)
            gameBtnReturn.addEventListener('click', (e) =>{
                const menu = document.querySelector(".menu");
                const menuContent = document.querySelector(".menu__content");
                menuContent.style.animation = "animate-menu-disabled 0.4s";


                setTimeout(() =>{
                    body.removeChild(menu);
                }, 300);
                
            })
        }
    })


    function inventoryRender(parent){
      
        const inventoryWrapper = document.createElement('div');
        inventoryWrapper.classList.add('inventory');
        inventoryWrapper.innerHTML = `
            <h3 class="inventory__title">Инвентарь</h3>
            <div class="inventory__wrapper">
                <img class="inventory__wrapper_close" src="./icons/attribute-icons/close-btn/btn-close.svg" alt="close">
            </div>
        `;
       

        parent.append(inventoryWrapper);

        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                const renderBlockInventory = document.createElement('img');
                renderBlockInventory.classList.add('invent');
                renderBlockInventory.setAttribute('src', './icons/attribute-icons/inventory-icons/cell.svg');
                document.querySelector(".inventory__wrapper").append(renderBlockInventory);


                renderBlockInventory.style.gridColumn = `${i} / 3`;
                renderBlockInventory.style.gridRow = `${j} / 3`;
            }
        }
    }
    inventoryRender(body);


    function openAndcloseInventory(){
        const btnInventoryClick = document.querySelector('.game-inventory');
        const closeInventoryMenu = document.querySelector(".inventory__wrapper_close");

        btnInventoryClick.addEventListener('click', (e) =>{
            const inventoryMenu = document.querySelector(".inventory");
            inventoryMenu.classList.add('active');

            closeInventoryMenu.addEventListener('click', (e) =>{
                inventoryMenu.classList.remove('active');
            })
        })
   }
   openAndcloseInventory();

   function renderBlockInventory(urlImage, parent){
    if(yRen === 3 && xRen === 3){ 
        console.log("yRen === 3 && xRen === 4")
    } else {
        const container = document.createElement("div");
        container.classList.add("containerImage");
        container.innerHTML = `<img class="containerImage-img" src="${urlImage}" alt="star-icon">`;
        xRen++;
       
        if(xRen === 4){
            xRen = xRen - 3;
            container.style.gridColumn = `${xRen} / 3`;
            yRen++;
            container.style.gridRow = `${yRen} / 3`;    
        }
       
        parent.append(container);
        container.style.gridColumn = `${xRen} / 3`;
        container.style.gridRow = `${yRen} / 3`;

    }

}



