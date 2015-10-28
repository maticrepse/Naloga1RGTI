/**
 * Created by maticrepse on 28/10/15.
 */
var canvas; //referenca na canvas
var gl; //referenca na openGL
var shaderProgram;
var triangleVertexPositionBuffer;
var squareVertexPositionBuffer;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function start(){
    canvas = document.getElementById("glcanvas");

    gl = initGL(canvas);

    if(gl){
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
}

function initGL(canvas){
    gl=null;

    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {

    }
    if(!gl){
        alert("Vas brskalnik ne podpira webGL.");
    }
    return gl;
}