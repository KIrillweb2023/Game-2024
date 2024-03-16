const parentElement = document.querySelector('#game'); // canvas
const imageState = [  'one.svg', 'one.svg', 'one.svg', 'one.svg', 'two.svg', 'three.svg' ];
const imageStarsState = [  'one-star-yellow.svg', 'two-star-yellow.svg', 'two-star-yellow.svg' ];



const items = []; // все елементы
const numberGridY = [1, 2, 3, 4, 5, 6, 7, 8];
const numberGridX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];


const configInterface = {
    gameScore: 0,  //Счет
    // Типы кристаллов: 
    greenStars: 0,
    yellowStars: 0,
    redStars: 0,

}
const config = {
    width: 80,
    height: 80,
    countX: 1,
    countY: 1
}   


const maxColAndRow = {
    columnMax: 16,
    rowMax: 8
}

const configRandomBlock = {
    gridX: 0,
    gridY: 0
}



const element = document.createElement('div');
element.classList.add('block-rute');
element.innerHTML = `<img class="block-rute-image" src="./icons/charater-icons/one.svg" alt="charaters">`;
parentElement.append(element);

element.style.width = `${config.width}px`;
element.style.height = `${config.height}px`;

animatePers(document.querySelector('.block-rute-image'), imageState, "./icons/charater-icons", 250);

document.addEventListener("keydown", (e) =>{

    if(e.code === "ArrowRight"){
        config.countX === 16 ? config.countX = 1 : config.countX++;
        settingsPositionX(element);
    } else if(e.code === "ArrowLeft"){
        config.countX === 1 ? config.countX = 16 : config.countX--;
        settingsPositionX(element);
    } else if(e.code === "ArrowDown"){
        config.countY === 8 ? config.countY = 1 : config.countY++;
        settingsPositionY(element);
    } else if(e.code === "ArrowUp"){
        config.countY === 1 ? config.countY = 8 : config.countY--;
        settingsPositionY(element);
    }
   
    if(config.countX === configRandomBlock.gridX && config.countY === configRandomBlock.gridY){
        const renderRandomBlock =  document.querySelector('.block')
        if(renderRandomBlock){
            renderRandomBlock.remove();
        }
        randomBlockRender(parentElement)
     
    }
})



function settingsPositionX(elem){ elem.style.gridColumn = `${config.countX} / ${maxColAndRow.columnMax}`; }
function settingsPositionY(elem){ elem.style.gridRow = `${config.countY} / ${maxColAndRow.rowMax}`; }
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
   
    block.classList.add('block');
    block.innerHTML = `<img id="greenJewel" class="block-random" src="./icons/star-icons/one-star-yellow.svg">`;
    parent.append(block);
   
    block.style.gridColumn = `${configRandomBlock.gridX} / ${maxColAndRow.columnMax}`;
    block.style.gridRow = `${configRandomBlock.gridY} / ${maxColAndRow.rowMax}`;

    animatePers(document.querySelector('.block-random'), imageStarsState , "./icons/star-icons", 500);
}
randomBlockRender(parentElement)

function animatePers(elem, arr, strUrl, configSeconds){
    let indificator = 0;
    setInterval(()=>{
        if(indificator < arr.length){
            elem.setAttribute('src', `${strUrl}/${arr[indificator]}`);
            indificator = indificator + 1;
            if(indificator === arr.length){
                return indificator = 0;
            }
        }
    }, configSeconds);
}



function renderLangscape(gridX){ 
    for (let i = 1; i <= gridX.length; i++) {
        for (let j = 1; j <= 8; j++) {
            const renderBlock = document.createElement('img');
            renderBlock.classList.add('ground');
            renderBlock.setAttribute('src', './icons/langstone-icons/grass-ground.svg');
            parentElement.append(renderBlock);


            // сделал динамическое подставление итератора в стили, иначе рендрит с хер чем попало
            renderBlock.style.gridColumn = `${i} / ${maxColAndRow.columnMax}`;
            renderBlock.style.gridRow = `${j} / ${maxColAndRow.rowMax}`;

            // console.log(j); 

            if(j === 8){
                renderBlock.setAttribute('src', './icons/langstone-icons/bottom-ground.svg');
            }
            if(i === 1){
                renderBlock.setAttribute('src', './icons/langstone-icons/left-ground.svg');
            }
            if(j === 3 && i === 5){
                renderBlock.setAttribute('src', './icons/langstone-icons/grass-ground-flowers.svg');
            }
            if(j === 7 && i === 12){
                renderBlock.setAttribute('src', './icons/langstone-icons/grass-ground-flowers.svg');
            }
            if(j === 2 && i === 16){
                renderBlock.setAttribute('src', './icons/langstone-icons/grass-ground-flowers.svg');
            }
            if(j === 8 && i === 1){
                renderBlock.setAttribute('src', './icons/langstone-icons/left-bottom-ground.svg');
            }
        }
    }
}

renderLangscape(numberGridX);