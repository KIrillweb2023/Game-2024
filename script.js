
const parentElement = document.querySelector('#game'); // canvas

function consoles(descr){
    console.log(`${descr}`);
}

const items = []; // все елементы
const numberGridY = [1, 2, 3, 4, 5, 6, 7, 8];
const numberGridX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

let randomX = Math.floor(Math.random() * numberGridX.length);
let randomY = Math.floor(Math.random() * numberGridY.length);

let countX = 1;
let countY = 1;



    const config = {
        width: 80,
        height: 80
    }    

 

    

    const element = document.createElement('div');
    element.classList.add('block-rute');
    parentElement.append(element);


    document.addEventListener("keydown", (e) =>{
       
        
       if(countX <= 0){ countX++; } 
       if(countY <= 0){ countY++; } 

        
       
        if(e.code === "ArrowRight"){
            // element.style.gridColumn = `${countX++} / 16`;
            countX++;
            settingsPositionX(element);
        } else if(e.code === "ArrowLeft"){
            // element.style.gridColumn = `${countX--} / 16`;
            countX--;
            settingsPositionX(element);
        } else if(e.code === "ArrowDown"){
            // element.style.gridRow = `${countY++} / 8`;  
            countY++;
            settingsPositionY(element);
        } else if(e.code === "ArrowUp"){
            // element.style.gridRow = `${countY--} / 8`; 
            countY--;
            settingsPositionY(element);
        }

        if(countX === randomX && countY === randomY){
            console.log(parentElement.childNodes)
            parentElement.childNodes[2].remove();
        }
     
        console.log(countY)
        console.log(countX)
    })


 
    element.style.width = `${config.width}px`;
    element.style.height = `${config.height}px`;

    function settingsPositionX(elem){ elem.style.gridColumn = `${countX} / 16`; }
    function settingsPositionY(elem){ elem.style.gridRow = `${countY} / 8`; }
    settingsPositionX(element);
    settingsPositionY(element);
    
    



    function renderRandomBlocks(parent){
        const block = document.createElement('div');
        block.classList.add('block-random');
        parent.append(block);

        block.style.gridColumn = `${randomX} / 16`;
        block.style.gridRow = `${randomY} / 8`;
    }
    // renderRandomBlocks(parentElement);

   












