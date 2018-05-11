var g_objDoc = null;      // The information of OBJ file
var g_drawingInfo = null; // The information for drawing 3D model

// Coordinate transformation matrix
var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();

var ANGLE_STEP = 30;   // The increments of rotation angle (degrees)

var last = Date.now(); // Last time that this function was called

var app = {};
app.texture = {};
app.buffers = {};
app.drawScene;
var gl;