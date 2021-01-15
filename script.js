const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let alive = true;
let count = 0;

function handleKeyUp(event){
  if(event.keyCode == 32){
    if(!isJumping){
      jump();
    }
  }
}

function jump(){  
  let upInterval = setInterval(() => {
    if(position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if(position <= 0){
          clearInterval(downInterval);
          if(alive !== false){
            const countTimeout = setTimeout(() => countPoints(), 1000);
            if(count === null || alive === false) {
            clearTimeout(countTimeout);
            }
          }
        }else{
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    }else{
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus(){
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if(cactusPosition <= -60){
      clearInterval(leftInterval);
      background.removeChild(cactus);
    }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
      //Game over
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
      alive = false;
    }else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';  
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function countPoints(){
  const countScore = document.querySelector('.count-points');
  count++;
  if(typeof(count) === 'number'){
    countScore.innerText = count;
  }
} 

createCactus();
document.addEventListener('keyup', handleKeyUp);