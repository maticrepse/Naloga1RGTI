/**
 * Created by maticrepse on 28/10/15.
 */
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var vednoID = mat4.create();

var vozlisca = [0.0, 0.0, 0.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0];

var povezave = [1, 3, 3, 2, 1, 2, 2, 4, 1, 4, 4, 3];

function start(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.translate(640, 250);
    ctx.scale(-1, 1);

    var persp = perspective(4);
    var translateK = translate(0.0, 0.0, -8.0);
    mat4.multiply(mvMatrix, translateK, persp);

    drawScene();
}


function drawScene(){
    mat4.multiply(pMatrix, pMatrix, mvMatrix);

    var vertex = [];
    for(var i = 0; i < vozlisca.length/4;i++){
        vertex[i*4] = vozlisca[i*4] * pMatrix[0] + vozlisca[i*4 + 1] * pMatrix[1] +vozlisca[i*4 + 2] * pMatrix[2] +vozlisca[i*4 + 3] * pMatrix[3];
        vertex[i*4+1] = vozlisca[i*4] * pMatrix[4] + vozlisca[i*4 + 1] * pMatrix[5] +vozlisca[i*4 + 2] * pMatrix[6] +vozlisca[i*4 + 3] * pMatrix[7];
        vertex[i*4+2] = vozlisca[i*4] * pMatrix[8] + vozlisca[i*4 + 1] * pMatrix[9] +vozlisca[i*4 + 2] * pMatrix[10] +vozlisca[i*4 + 3] * pMatrix[11];
        vertex[i*4+3] = vozlisca[i*4] * pMatrix[12] + vozlisca[i*4 + 1] * pMatrix[13] +vozlisca[i*4 + 2] * pMatrix[14] +vozlisca[i*4 + 3] * pMatrix[15];
    }

    var normalizacija = [];
    for(var i=0; i<vertex.length/4;i++){
        if(vertex[i*4+3] !== 1 || vertex[i*4+3] !== 0){
            normalizacija[i*4]  = vertex[i*4]/vertex[i*4+3];
            normalizacija[i*4+1]  = vertex[i*4+1]/vertex[i*4+3];
            normalizacija[i*4+2]  = vertex[i*4+2]/vertex[i*4+3];
            normalizacija[i*4+3]  = 1;
        }else{
            normalizacija[i*4]  = vertex[i*4];
            normalizacija[i*4+1]  = vertex[i*4+1];
            normalizacija[i*4+2]  = vertex[i*4+2];
            normalizacija[i*4+3]  = 1;
        }
    }
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");


    for(var i=0; i<povezave.length/2;i++){
        var vozlisce1 = povezave[i*2];
        var vozlisce2 = povezave[i*2+1];

        var x1 = normalizacija[(vozlisce1-1)*3];
        var y1 = normalizacija[(vozlisce1-1)*3+1];
        var z1 = normalizacija[(vozlisce1-1)*3+2];

        var x2 = normalizacija[(vozlisce2-1)*3];
        var y2 = normalizacija[(vozlisce2-1)*3+1];
        var z2 = normalizacija[(vozlisce2-1)*3+2];

        ctx.moveTo(x1*75, y1*75);
        ctx.lineTo(x2*75, y2*75);
    }
    ctx.stroke();

}

function rotateX(alpha){
    var matrika = mat4.create();
    var sin = Math.sin(alpha);
    var cos = Math.cos(alpha);
    matrika[5] = cos;
    matrika[6] = -sin;
    matrika[9] = sin;
    matrika[10] = cos;

    return matrika;
}

function rotateY(alpha){
    var matrika = mat4.create();
    var sin = Math.sin(alpha);
    var cos = Math.cos(alpha);
    matrika[0] = cos;
    matrika[2] = sin;
    matrika[8] = -sin;
    matrika[10] = cos;

    return matrika;
}

function rotateZ(alpha){
    var matrika = mat4.create();
    var sin = Math.sin(alpha);
    var cos = Math.cos(alpha);
    matrika[0] = cos;
    matrika[1] = -sin;
    matrika[4] = sin;
    matrika[5] = cos;

    return matrika;
}

function translate(dx, dy, dz){
    var matrika = mat4.create();
    matrika[3] = dx;
    matrika[7] = dy;
    matrika[11] = dz;

    return matrika;
}

function scale(sx, sy, sz){
    var matrika = mat4.create();
    matrika[0] = sx;
    matrika[5] = sy;
    matrika[10] = sz;

    return matrika;
}

function perspective(d){
    var matrika = mat4.create();
    matrika[14] = 1/d;
    matrika[15] = 0;

    return matrika;
}















