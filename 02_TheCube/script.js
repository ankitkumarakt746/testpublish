let height           = window.innerHeight;
let width            = window.innerWidth;
let angle            = 0;
let cube;
let sponge           = [];
let autoRotatebutton = document.getElementById("autoRotateButton");
let autoRotate       = true;
let fractalButton    = document.getElementById("fractalButton");
let flipButton       = document.getElementById("flipButton");
let flip             = false;
let refreshButton    = document.getElementById("refreshButton");


autoRotatebutton.addEventListener("click", function(){
    if (autoRotate == false){
        autoRotate = true;
    }
    else{
        autoRotate = false;
    }
})
flipButton.addEventListener("click", function(){
    if (flip == false){
        flip = true;
    }
    else{
        flip = false;
    }
})
refreshButton.addEventListener("click", function(){
    angle            = 0;
    sponge           = [];
    autoRotate       = false;
    flip             = false;
    cube = new Cube(0,0,0,200);
    sponge.push(cube);
})

class PVector{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}


class Cube{
    constructor(x, y, z, size){
        this.position = new PVector(x, y, z);
        this.size = size;
    }

    show(){
        push();
        translate(this.position.x, this.position.y, this.position.z);
        fill(255);
        box(this.size);
        pop();
    }

    generate(){
        let nestedCubes = [];
        for(let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){
                for(let k=-1; k<2; k++){
                    if(flip == false){
                        if((abs(i) + abs(j) + abs(k)) > 1){
                            let newSize = this.size/3;
                            let c = new Cube(
                                this.position.x + i * newSize, 
                                this.position.y + j * newSize, 
                                this.position.z + k * newSize, 
                                newSize
                            );
                            nestedCubes.push(c);
                        }
                    }else{
                        if((abs(i) + abs(j) + abs(k)) <= 1){
                            let newSize = this.size/3;
                            let c = new Cube(
                                this.position.x + i * newSize, 
                                this.position.y + j * newSize, 
                                this.position.z + k * newSize, 
                                newSize
                            );
                            nestedCubes.push(c);
                        }
                    }
                }
            }
        }
        console.log("end");
        return nestedCubes;
    }
}

function setup(){
    createCanvas(width, height, WEBGL);
    frameRate(60);
    cube = new Cube(0,0,0,200);
    sponge.push(cube);
    // background(0);
}

fractalButton.addEventListener("click", function(){
    let next = [];
    sponge.forEach(element => {
        let newCubes = element.generate();
        next = next.concat(newCubes);
    })
    sponge = next;
})

function draw(){
    background(51);
    stroke(0);
    noFill();
    lights();
    rotateX(angle);
    rotateY(angle);
    rotateZ(angle);
    if(autoRotate == true){
        angle += 0.005;
    }
    for (var i = 0; i < sponge.length; i++) {
        sponge[i].show();
    }
    if(angle >= 10){
        angle = 0;
    }
    // cube.show();
    // sponge.forEach(element => {
    //     element.show();
    // });
}