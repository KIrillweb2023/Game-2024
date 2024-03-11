
const parentElement = document.querySelector('#game'); // canvas
const imageState = [ 'one.svg', 'one.svg', 'one.svg', 'one.svg', 'one.svg', 'two.svg', 'three.svg', 'for.svg' ];

// let score = document.querySelector('#score');

const items = []; // все елементы
const numberGridY = [1, 2, 3, 4, 5, 6, 7, 8];
const numberGridX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];




const configInterface = {
    gameScore: 0,  //Счет
    // Типы кристаллов: 
    greenJewel: 0,
    yellowJewel: 0,
    redJewel: 0,

}
const config = {
    width: 80,
    height: 80,
    countX: 1,
    countY: 1
}   



const configRandomBlock = {
    gridX: 0,
    gridY: 0
}






// score.innerHTML = configInterface.gameScore;






const element = document.createElement('img');
element.classList.add('block-rute');
element.setAttribute('src', './images/animated-pers/one.svg');




parentElement.append(element);

element.style.width = `${config.width}px`;
element.style.height = `${config.height}px`;

//Вывод всех функций
animatePers(element, imageState);

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






function settingsPositionX(elem){ elem.style.gridColumn = `${config.countX} / 16`; }
function settingsPositionY(elem){ elem.style.gridRow = `${config.countY} / 8`; }
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
    // block.innerHTML = `<div class="block-random"></div>`;
    block.innerHTML = `<img id="greenJewel" class="block-random" src="./images/crystals-type/crystal-green.svg">`;
    parent.append(block);
   
    block.style.gridColumn = `${configRandomBlock.gridX} / 16`;
    block.style.gridRow = `${configRandomBlock.gridY} / 8`;

    
    // console.log(configRandomBlock.gridX);
    // console.log(configRandomBlock.gridY);
}
randomBlockRender(parentElement)



function animatePers(elem, url){
    let indificator = 0;
    setInterval(()=>{
        if(indificator < url.length){
            elem.setAttribute('src', `./images/animated-pers/${url[indificator]}`);
            indificator = indificator + 1;
            if(indificator === url.length){
                return indificator = 0;
            }
        }
    }, 150);
}








// let renderXlang = 16;
// let renderYlang = 1;   


// for(let x = 1; x <= renderXlang; x++){
//     const renderBlock = document.createElement('img');
//     renderBlock.classList.add('ground');
//     renderBlock.setAttribute('src', './images/landscape/green-world.svg');
//     parentElement.append(renderBlock);

   

   
     
   
//     renderBlock.style.gridColumn = `${x} / 16`;
//     renderBlock.style.gridRow = `${renderYlang} / 8`;

//     if(x === 16){
//         // renderYlang++;
//         for(let j = 1; j <= x; j++){
//             renderBlock.style.gridColumn = `${j} / 16`;
//             renderBlock.style.gridRow = `${renderYlang} / 8`;
//         }
//     }
    
//  }


function renderLangscape(gridX){ 
    for (let i = 1; i <= gridX.length; i++) {
        for (let j = 1; j <= 8; j++) {
            const renderBlock = document.createElement('img');
            renderBlock.classList.add('ground');
            renderBlock.setAttribute('src', './images/landscape/green-world.svg');
            parentElement.append(renderBlock);


            // сделал динамическое подставление итератора в стили, иначе рендрит с хер чем попало
            renderBlock.style.gridColumn = `${i} / 16`;
            renderBlock.style.gridRow = `${j} / 8`;

            // console.log(j); 
        }
    }
}

renderLangscape(numberGridX);