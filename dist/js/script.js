document.addEventListener('DOMContentLoaded', () =>{
        
    const parentElement = document.querySelector('#game'); // canvas
    const imageState = [  'one.svg', 'one.svg', 'one.svg', 'one.svg', 'two.svg', 'three.svg' ];

    const imageRandomUrl = [ 'red-stars/one-red-star.svg', 'yellow-stars/one-star-yellow.svg', 'blue-stars/one-blue-star.svg', 'orange-stars/one-orange-star.svg', 'purple-stars/one-star-purple.svg' ];

    const urlStarsPath = {
        pathYellow: [ 'one-star-yellow.svg', 'one-star-yellow.svg', 'two-star-yellow.svg'],
        pathRed: [ 'one-red-star.svg', 'one-red-star.svg', 'two-red-star.svg'],
        pathPurple: [ 'one-star-purple.svg', 'one-star-purple.svg', 'two-star-purple.svg' ],
        pathBlue: [ 'one-blue-star.svg', 'one-blue-star.svg', 'two-blue-star.svg' ],
        pathOrange: [ 'one-orange-star.svg', 'one-orange-star.svg', 'two-orange-star.svg' ]
    }


    const yellowStar = './icons/star-icons/yellow-stars/one-star-yellow.svg';
    const redStar = './icons/star-icons/red-stars/one-red-star.svg';
    const purpleStar = './icons/star-icons/purple-stars/one-star-purple.svg';
    const blueStar = './icons/star-icons/blue-stars/one-blue-star.svg';
    const orangeStar = './icons/star-icons/orange-stars/one-orange-star.svg';



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


    const configLevel = {
        maxWidthLevel: 300,
        widthUp: 0,
        countUp: 0 
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
        } else if(e.code === "ArrowLeft"){
            config.countX === 1 ? config.countX = 16 : config.countX--;
        } else if(e.code === "ArrowDown"){
            config.countY === 8 ? config.countY = 1 : config.countY++;
        } else if(e.code === "ArrowUp"){ 
            config.countY === 1 ? config.countY = 8 : config.countY--;
        }
    
        if(config.countX === configRandomBlock.gridX && config.countY === configRandomBlock.gridY){
            const renderRandomBlock = document.querySelector('.block')
            if(renderRandomBlock){
                renderRandomBlock.remove();
            }

            // const randomBlockMath = document.querySelector("#randomBlock").getAttribute('src');

            configLevel.widthUp += 30;
            stateWidthActive(configLevel.widthUp);
            if(configLevel.widthUp >= configLevel.maxWidthLevel){
                configLevel.widthUp = configLevel.maxWidthLevel - configLevel.widthUp;
                configLevel.countUp++;
               
                upTextLevel(configLevel.countUp);
                
            }

            randomBlockRender(parentElement, imageRandomUrl, yellowStar, redStar, purpleStar, blueStar, orangeStar);
        }
        settingsPositionX(element);
        settingsPositionY(element);
    })



    function settingsPositionX(elem){ elem.style.gridColumn = `${config.countX} / ${maxColAndRow.columnMax}`; }
    function settingsPositionY(elem){ elem.style.gridRow = `${config.countY} / ${maxColAndRow.rowMax}`; }
    settingsPositionX(element);
    settingsPositionY(element);

   

    function randomBlockRender(parent, arr, yellow, red, purple, blue, orange){
        let randomX = Math.floor(Math.random() * numberGridX.length);
        let randomY = Math.floor(Math.random() * numberGridY.length);

        let id = Math.floor(Math.random() * arr.length);

        randomX === 0 ? randomX++ : randomX;
        randomY === 0 ? randomY++ : randomY;

        configRandomBlock.gridX = randomX;
        configRandomBlock.gridY = randomY;

    
      
        const block = document.createElement('div');
        block.classList.add('block');
        block.innerHTML = `<img id="randomBlock" class="block-random" src="./icons/star-icons/${arr[id]}">`;
        parent.append(block);
    
        block.style.gridColumn = `${configRandomBlock.gridX} / ${maxColAndRow.columnMax}`;
        block.style.gridRow = `${configRandomBlock.gridY} / ${maxColAndRow.rowMax}`;




        const atributesRandomBlock = document.querySelector("#randomBlock").getAttribute('src');
        
        if(atributesRandomBlock === yellow) {
            animatePers(document.querySelector("#randomBlock"), urlStarsPath.pathYellow , "./icons/star-icons/yellow-stars", 500);
        } else if(atributesRandomBlock === red){
            animatePers(document.querySelector("#randomBlock"), urlStarsPath.pathRed , "./icons/star-icons/red-stars", 500);
        } else if(atributesRandomBlock === purple) {
            animatePers(document.querySelector("#randomBlock"), urlStarsPath.pathPurple , "./icons/star-icons/purple-stars", 500);
        } else if(atributesRandomBlock === blue) {
            animatePers(document.querySelector("#randomBlock"), urlStarsPath.pathBlue , "./icons/star-icons/blue-stars", 500);
        } else if(atributesRandomBlock === orange) {
            animatePers(document.querySelector("#randomBlock"), urlStarsPath.pathOrange , "./icons/star-icons/orange-stars", 500);
        }
    }
   
    randomBlockRender(parentElement, imageRandomUrl, yellowStar, redStar, purpleStar, blueStar, orangeStar);


   
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
        for (let i = 1; i <= gridX; i++) {
            for (let j = 1; j <= 8; j++) {
                const renderBlock = document.createElement('img');
                renderBlock.classList.add('ground');
                renderBlock.setAttribute('src', './icons/langstone-icons/grass-ground.svg');
                parentElement.append(renderBlock);


                // сделал динамическое подставление итератора в стили, иначе рендрит с хер чем попало
                renderBlock.style.gridColumn = `${i} / ${maxColAndRow.columnMax}`;
                renderBlock.style.gridRow = `${j} / ${maxColAndRow.rowMax}`;


                j === 8 ? renderBlock.setAttribute('src', './icons/langstone-icons/bottom-ground.svg') : j;
                i === 1 ?  renderBlock.setAttribute('src', './icons/langstone-icons/left-ground.svg') : i;
                j === 3 && i === 5 ? renderBlock.setAttribute('src', './icons/langstone-icons/grass-ground-flowers.svg') : i;
                j === 7 && i === 12 ? renderBlock.setAttribute('src', './icons/langstone-icons/grass-ground-flowers.svg') : i;
                j === 2 && i === 16 ? renderBlock.setAttribute('src', './icons/langstone-icons/grass-ground-flowers.svg') : i;
                j === 8 && i === 1 ? renderBlock.setAttribute('src', './icons/langstone-icons/left-bottom-ground.svg') : i;
                
            }
        }
    }

    renderLangscape(maxColAndRow.columnMax);



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
 
    levelUp(parentElement, configLevel.widthUp, configLevel.countUp);
    upTextLevel(configLevel.countUp);

    function pauseBtnRender(parent){
        const btnPause = document.createElement('button');
        btnPause.classList.add('game-pause');
        btnPause.innerHTML = `<img class="game-pause-image" src="./icons/attribute-icons/btn-pause/btn-pause.svg" alt="btn-pause">`;
        parent.append(btnPause);

        const imageBtnPause = document.querySelector('.game-pause-image');
        btnPause.addEventListener("mouseover", (e) => {    
            imageBtnPause.setAttribute("src", "./icons/attribute-icons/btn-pause/btn-pause-active.svg");      
        });
        btnPause.addEventListener("mouseout", (e) => {    
            imageBtnPause.setAttribute("src", "./icons/attribute-icons/btn-pause/btn-pause.svg");      
        });
    }
    pauseBtnRender(parentElement);



});

