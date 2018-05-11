//------------------------------------------------------------------------------
// Material Object
//------------------------------------------------------------------------------
var Material = function(name, r, g, b, a) {
    this.name = name;
    this.color = new Color(r, g, b, a);
  }
  
  //------------------------------------------------------------------------------
  // Vertex Object
  //------------------------------------------------------------------------------
  var Vertex = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  //------------------------------------------------------------------------------
  // Normal Object
  //------------------------------------------------------------------------------
  var Normal = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

    //------------------------------------------------------------------------------
  // Texture Object
  //------------------------------------------------------------------------------
  var Texture = function(x, y) {
    this.x = x;
    this.y = y;
  }
  
  //------------------------------------------------------------------------------
  // Color Object
  //------------------------------------------------------------------------------
  var Color = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  
  //------------------------------------------------------------------------------
  // OBJObject Object
  //------------------------------------------------------------------------------
  var OBJObject = function(name) {
    this.name = name;
    this.faces = new Array(0);
    this.numIndices = 0;
  }
  
  OBJObject.prototype.addFace = function(face) {
    this.faces.push(face);
    this.numIndices += face.numIndices;
  }
  
  //------------------------------------------------------------------------------
  // Face Object
  //------------------------------------------------------------------------------
  var Face = function(materialName) {
    this.materialName = materialName;
    if(materialName == null)  this.materialName = "";
    this.vIndices = new Array(0);
    this.tIndices = new Array(0);
    this.nIndices = new Array(0);
  }
  
  //------------------------------------------------------------------------------
  // DrawInfo Object
  //------------------------------------------------------------------------------
  var DrawingInfo = function(vertices, normals, colors, indices, textures) {
    this.vertices = vertices;
    this.normals = normals;
    this.colors = colors;
    this.indices = indices;
    this.textures = textures;
  }