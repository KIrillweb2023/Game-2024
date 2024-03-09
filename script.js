
const parentElement = document.querySelector('#game'); // canvas


const items = []; // все елементы
const numberGridY = [1, 2, 3, 4, 5, 6, 7, 8];
const numberGridX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

let countX = 1;
let countY = 1;



const config = {
    width: 80,
    height: 80
}   

const configRandomBlock = {
    gridX: 0,
    gridY: 0
}





const element = document.createElement('div');
element.classList.add('block-rute');
parentElement.append(element);

element.style.width = `${config.width}px`;
element.style.height = `${config.height}px`;

document.addEventListener("keydown", (e) =>{

    if(e.code === "ArrowRight"){
        countX === 16 ? countX = 1 : countX++;
        settingsPositionX(element);
    } else if(e.code === "ArrowLeft"){
        countX === 1 ? countX = 16 : countX--;
        settingsPositionX(element);
    } else if(e.code === "ArrowDown"){
        countY === 8 ? countY = 1 : countY++;
        settingsPositionY(element);
    } else if(e.code === "ArrowUp"){
        countY === 1 ? countY = 8 : countY--;
        settingsPositionY(element);
    }
   
    if(countX === configRandomBlock.gridX && countY === configRandomBlock.gridY){
        parentElement.childNodes[2].remove();
        randomBlockRender(parentElement)

        console.log(configRandomBlock.gridX);
        console.log(configRandomBlock.gridY);
    }
 


})




function settingsPositionX(elem){ elem.style.gridColumn = `${countX} / 16`; }
function settingsPositionY(elem){ elem.style.gridRow = `${countY} / 8`; }
settingsPositionX(element);
settingsPositionY(element);





function randomBlockRender(parent){

    let randomX = Math.floor(Math.random() * numberGridX.length);
    let randomY = Math.floor(Math.random() * numberGridY.length);


    randomX === 0 ? randomX++ : randomX;
    randomY === 0 ? randomY++ : randomY;

  
    configRandomBlock.gridX = randomX;
    configRandomBlock.gridY = randomY;
    const block = document.createElement('div');
   
    block.classList.add('block-random');
    parent.append(block);
   
    block.style.gridColumn = `${configRandomBlock.gridX} / 16`;
    block.style.gridRow = `${configRandomBlock.gridY} / 8`;

    
    // console.log(configRandomBlock.gridX);
    // console.log(configRandomBlock.gridY);
}
randomBlockRender(parentElement)

















