function getCubeData() {
  // Create a buffer for the cube's vertex positions.
  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  const positions = [
    // Front face
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,

    // Back face
    -0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, -0.5, -0.5,

    // Top face
    -0.5, 0.5, -0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,

    // Bottom face
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5,
    -0.5, -0.5, 0.5,

    // Right face
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,

    // Left face
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Now set up the texture coordinates for the faces.

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  var f = 1.0 / 6.0;
  const textureCoordinates = [
    // Front
    2 * f, 1.0,
    3 * f, 1.0,
    3 * f, 0.0,
    2 * f, 0.0,
    // Back
    3 * f, 1.0,
    3 * f, 0.0,
    4 * f, 0.0,
    4 * f, 1.0,
    // Top
    0.0, 0.0,
    0.0, 1.0,
    f, 1.0,
    f, 0.0,
    // Bottom
    f, 0.0,
    2 * f, 0.0,
    2 * f, 1.0,
    f, 1.0,
    // Right
    1.0, 1.0,
    1.0, 0.0,
    5 * f, 0.0,
    5 * f, 1.0,
    // Left
    5 * f, 1.0,
    4 * f, 1.0,
    4 * f, 0.0,
    5 * f, 0.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
    gl.STATIC_DRAW);

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  const vertexNormals = [
    // Front
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    // Back
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,

    // Top
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    // Bottom
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,

    // Right
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    // Left
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
    gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0, 1, 2, 0, 2, 3,    // front
    4, 5, 6, 4, 6, 7,    // back
    8, 9, 10, 8, 10, 11,   // top
    12, 13, 14, 12, 14, 15,   // bottom
    16, 17, 18, 16, 18, 19,   // right
    20, 21, 22, 20, 22, 23,   // left
  ];

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
    vertexCount: 36,
    normal: normalBuffer
  };
}


function getCylData(faces) {

  const angle = 360.0 / faces;
  var r = 152.0 / 654.0; //Usamos una textura de 654px, el radio de la lata es de 152px. De aquí que el radio en porcentaje es 152/654

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.


  const positions = [];
  const indices = [];
  const normals = [];

  var textureCoordinates = [];

  for (var i = 0; i < faces; i++) {
    var points = [
      0.0, 0.5, 0.0, //0
      0.5 * Math.cos(degToRad(i * angle)), 0.5, 0.5 * Math.sin(degToRad(i * angle)),
      0.5 * Math.cos(degToRad((i + 1) * angle)), 0.5, 0.5 * Math.sin(degToRad((i + 1) * angle)), //top face

      0.0, -0.5, 0.0, //0
      0.5 * Math.cos(degToRad(i * angle)), -0.5, 0.5 * Math.sin(degToRad(i * angle)),
      0.5 * Math.cos(degToRad((i + 1) * angle)), -0.5, 0.5 * Math.sin(degToRad((i + 1) * angle)), // bottom face

      0.5 * Math.cos(degToRad(i * angle)), 0.5, 0.5 * Math.sin(degToRad(i * angle)),
      0.5 * Math.cos(degToRad(i * angle)), -0.5, 0.5 * Math.sin(degToRad(i * angle)),
      0.5 * Math.cos(degToRad((i + 1) * angle)), -0.5, 0.5 * Math.sin(degToRad((i + 1) * angle)),

      0.5 * Math.cos(degToRad(i * angle)), 0.5, 0.5 * Math.sin(degToRad(i * angle)),
      0.5 * Math.cos(degToRad((i + 1) * angle)), 0.5, 0.5 * Math.sin(degToRad((i + 1) * angle)),
      0.5 * Math.cos(degToRad((i + 1) * angle)), -0.5, 0.5 * Math.sin(degToRad((i + 1) * angle))
    ];

    var texturePoints = [
      r, r, //0
      r + r * Math.cos(degToRad(i * angle)), r + r * Math.sin(degToRad(i * angle)),
      r + r * Math.cos(degToRad((i + 1) * angle)), r + r * Math.sin(degToRad((i + 1) * angle)),  //Textura de la cara superficial

      1.0 - r, r, //0
      (1.0 - r) + r * Math.cos(degToRad(i * angle)), r + r * Math.sin(degToRad(i * angle)),
      (1.0 - r) + r * Math.cos(degToRad((i + 1) * angle)), r + r * Math.sin(degToRad((i + 1) * angle)),  //Textura de la cara inferior

      i * angle / 360.0, 302.0 / 654.0,
      i * angle / 360.0, 1.0,
      (i + 1) * angle / 360.0, 1.0,

      i * angle / 360.0, 302.0 / 654.0,
      (i + 1) * angle / 360.0, 302.0 / 654.0,
      (i + 1) * angle / 360.0, 1.0
    ];
    var ln = getNormalVector( //Normal de las caras laterales, ambas caras contienen la misma normal
      [0.5 * Math.cos(degToRad(i * angle)), 0.5, 0.5 * Math.sin(degToRad(i * angle))],
      [0.5 * Math.cos(degToRad(i * angle)), -0.5, 0.5 * Math.sin(degToRad(i * angle))],
      [0.5 * Math.cos(degToRad((i + 1) * angle)), -0.5, 0.5 * Math.sin(degToRad((i + 1) * angle))]
    ); 
    var vertexNormals = [
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,   //Top Face Normal

      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,   //Top Face Normal

      ln[0], ln[1], ln[2],
      ln[0], ln[1], ln[2],
      ln[0], ln[1], ln[2],

      ln[0], ln[1], ln[2],
      ln[0], ln[1], ln[2],
      ln[0], ln[1], ln[2]
    ]

    for (var k = 0; k < points.length; k++) {
      positions.push(points[k]);
    }

    for (var k = 0; k < texturePoints.length; k++) {
      textureCoordinates.push(texturePoints[k]);
    }

    for (var k = 0; k < vertexNormals.length; k++) {
      normals.push(vertexNormals[k]);
    }

  }

  for (var j = 0; j < positions.length; j++) {
    indices.push(j);
  }

  console.log(positions);
  console.log(textureCoordinates);
  console.log(indices);
  console.log(normals);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.



  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
    vertexCount: 12 * faces,
    normal: normalBuffer
  };
}


function getSphereData() {
  console.log("Finding shpere data")
  const faces = 50;
  const ylong = 1 / faces;
  const angle = 360.0 / faces;
  var r = 0.5;

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  const spherePositions = [];
  const sphereIndices = [];
  var sphereTextureCoordinates = [];
  const sphereNormals = [];

  for (var i = -1 * ((faces / 2)); i < faces / 2; i++) { //Recorremos 
    var y0 = i * ylong;
    var y1 = (i + 1) * ylong;
    var r0 = Math.sqrt(0.25 - y0 * y0);
    var r1 = Math.sqrt(0.25 - y1 * y1);

    for (var j = 0; j < faces; j++) {
      var points = [
        r0 * Math.cos(degToRad(j * angle)), y0, r0 * Math.sin(degToRad(j * angle)), //0
        r1 * Math.cos(degToRad(j * angle)), y1, r1 * Math.sin(degToRad(j * angle)), //1
        r1 * Math.cos(degToRad((j + 1) * angle)), y1, r1 * Math.sin(degToRad((j + 1) * angle)), //2

        r0 * Math.cos(degToRad(j * angle)), y0, r0 * Math.sin(degToRad(j * angle)), //3
        r0 * Math.cos(degToRad((j + 1) * angle)), y0, r0 * Math.sin(degToRad((j + 1) * angle)), //4
        r1 * Math.cos(degToRad((j + 1) * angle)), y1, r1 * Math.sin(degToRad((j + 1) * angle)), //5
      ];

      var ln = getNormalVector( //Normal de las caras laterales, ambas caras contienen la misma normal
        [r0 * Math.cos(degToRad(j * angle)), y0, r0 * Math.sin(degToRad(j * angle))], //0
        [r1 * Math.cos(degToRad(j * angle)), y1, r1 * Math.sin(degToRad(j * angle))], //1
        [r1 * Math.cos(degToRad((j + 1) * angle)), y1, r1 * Math.sin(degToRad((j + 1) * angle))]
      ); 

      var vertexNormals = [
        ln[0], ln[1], ln[2],
        ln[0], ln[1], ln[2],
        ln[0], ln[1], ln[2],
  
        ln[0], ln[1], ln[2],
        ln[0], ln[1], ln[2],
        ln[0], ln[1], ln[2]
      ]

      var texturePoints = [
        j * angle / 360.0, 0.5 + y0, //0
        j * angle / 360.0, 0.5 + y1, //1
        (j + 1) * angle / 360.0, 0.5 + y1, //2
        j * angle / 360.0, 0.5 + y0, //3
        (j + 1) * angle / 360.0, 0.5 + y0, //4
        (j + 1) * angle / 360.0, 0.5 + y1 //5
      ];

      for (var k = 0; k < points.length; k++) {
        spherePositions.push(points[k]);
      }

      for (var k = 0; k < texturePoints.length; k++) {
        sphereTextureCoordinates.push(texturePoints[k]);
      }

      for (var k = 0; k < vertexNormals.length; k++) {
        sphereNormals.push(vertexNormals[k]);
      }
    }
  }
  var sphereVertexCount = spherePositions.length / 3;
  for (var n = 0; n < spherePositions.length; n++) {
    sphereIndices.push(n);
  }

  console.log(spherePositions);
  console.log(sphereTextureCoordinates);
  console.log(sphereIndices);
  console.log("VertextCount --> " + sphereVertexCount);

  const spherePositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, spherePositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(spherePositions), gl.STATIC_DRAW);

  const sphereTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereTextureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereTextureCoordinates), gl.STATIC_DRAW);

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereNormals), gl.STATIC_DRAW);

  const sphereIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndexBuffer);


  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(sphereIndices), gl.STATIC_DRAW);

  return {
    position: spherePositionBuffer,
    textureCoord: sphereTextureCoordBuffer,
    indices: sphereIndexBuffer,
    vertexCount: sphereVertexCount,
    normal: normalBuffer
  };
}