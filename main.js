// OBJViewer.js (c) 2012 matsuda and itami
// Vertex shader program
var VSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'attribute vec4 a_Normal;\n' +
    'attribute vec2 a_Texture;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'uniform mat4 u_NormalMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'varying vec2 v_Texture;\n' +
    'varying vec4 v_Normal;\n' +
    'void main() {\n' +
    '  vec3 lightDirection = vec3(-0.35, 0.35, 0.87);\n' +
    '  gl_Position = u_MvpMatrix * a_Position;\n' +
    '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
    '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
    '  v_Color = vec4(a_Color.rgb * nDotL, a_Color.a);\n' +
    '  v_Texture = a_Texture;\n' +
    '  v_Normal = a_Normal;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    'varying vec4 v_Color;\n' +
    'varying vec2 v_Texture;\n' +
    'uniform sampler2D uSampler;\n' +
    'uniform mat4 u_NormalMatrix;\n' +
    'varying vec4 v_Normal;\n' +
    'uniform bool uHasTexture;\n' +
    'void main() {\n' +
    '  vec3 lightDirection = vec3(-0.35, 0.35, 0.87);\n' +
    '  vec3 normal = normalize(vec3(u_NormalMatrix * v_Normal));\n' +
    '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
    '  vec4 texelColor = texture2D(uSampler, v_Texture);\n' +
    '  if (uHasTexture) {gl_FragColor = vec4(texelColor.rgb * nDotL, texelColor.a);}\n' +
    '  else {gl_FragColor = vec4(v_Color.rgb * nDotL, v_Color.a);}\n' +
    '}\n';

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Set the clear color and enable the depth test
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Get the storage locations of attribute and uniform variables
    var program = gl.program;
    program.a_Position = gl.getAttribLocation(program, 'a_Position');
    program.a_Normal = gl.getAttribLocation(program, 'a_Normal');
    program.a_Color = gl.getAttribLocation(program, 'a_Color');
    program.a_Texture = gl.getAttribLocation(program, 'a_Texture');
    program.u_MvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
    program.u_NormalMatrix = gl.getUniformLocation(program, 'u_NormalMatrix');
    program.uSampler = gl.getUniformLocation(program, 'uSampler');
    program.hasTexture = gl.getUniformLocation(program, 'uHasTexture');

    if (program.a_Position < 0 || program.a_Normal < 0 || program.a_Color < 0 ||
        !program.u_MvpMatrix || !program.u_NormalMatrix) {
        console.log('attribute');
        return;
    }

    // Prepare empty buffer objects for vertex coordinates, colors, and normals
    var model = initVertexBuffers(gl, program);
    if (!model) {
        console.log('Failed to set the vertex information');
        return;
    }

    var viewProjMatrix = new Matrix4();
    viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 5000.0);
    viewProjMatrix.lookAt(0.0, 500.0, 200.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

    // Start reading the OBJ file
    var missileTexture = initTexture('objs/missile/Texture.png', gl);
    //var missileTexture = initTexture('objs/Textures/sh3.jpg', gl);
    readOBJFile('objs/missile/missile.obj', gl, model, 30, true);
    //readOBJFile('objs/Sample_Ship_OBJ/Sample_Ship.obj', gl, model, 70, true);
    //readOBJFile('objs/cube/cube.obj', gl, model, 50, true);
    //readOBJFile('objs/low_polly/low-poly-mill.obj', gl, model, 1, true);
    var currentAngle = 0.0; // Current rotation angle [degree]
    var tick = function () {   // Start drawing
        currentAngle = animate(currentAngle); // Update current rotation angle
        draw(gl, gl.program, currentAngle, viewProjMatrix, model, missileTexture.texture);
        requestAnimationFrame(tick, canvas);
    };
    tick();
}

function draw(gl, program, angle, viewProjMatrix, model, texture) {
    if (g_objDoc != null && g_objDoc.isMTLComplete()) { // OBJ and all MTLs are available
        g_drawingInfo = onReadComplete(gl, model, g_objDoc);
        g_objDoc = null;
    }
    if (!g_drawingInfo) return;   // モデルを読み込み済みか判定

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear color and depth buffers
    g_modelMatrix.setRotate(angle, 1.0, 0.0, 0.0); // 適当に回転
    g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
    g_modelMatrix.rotate(angle, 0.0, 0.0, 1.0);

    // Calculate the normal transformation matrix and pass it to u_NormalMatrix
    g_normalMatrix.setInverseOf(g_modelMatrix);
    g_normalMatrix.transpose();
    gl.uniformMatrix4fv(program.u_NormalMatrix, false, g_normalMatrix.elements);

    // Calculate the model view project matrix and pass it to u_MvpMatrix
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);

    if (texture != null) {
        gl.uniform1i(program.hasTexture, true);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(program.uSampler, 1);
    }else{
        gl.uniform1i(program.hasTexture, false);
    }
    // Draw
    gl.drawElements(gl.TRIANGLES, g_drawingInfo.indices.length, gl.UNSIGNED_SHORT, 0);
}