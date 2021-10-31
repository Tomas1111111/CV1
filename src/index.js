import "./styles.css"; // keep this here!

// naimportujte vše co je potřeba z BabylonJS
import {
  Engine,
  Scene,
  UniversalCamera,
  MeshBuilder,
  StandardMaterial,
  DirectionalLight,
  Vector3,
  Color3
} from "@babylonjs/core";

//canvas je grafické okno, to rozáhneme přes obrazovku
const canvas = document.getElementById("renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, true);

//scéna
const scene = new Scene(engine);

//vytoření kamery v pozici -5 (dozadu)
const camera = new UniversalCamera("Camera", new Vector3(0, 0, 6), scene);

//zaměřit kameru do středu
camera.setTarget(Vector3.Zero());

//spojení kamery a grafikcého okna
camera.attachControl(canvas, true);

var i = 0;
for (i = 0; i < 5; i++) {
  // Our built-in 'sphere' shape.
  var sphere = MeshBuilder.CreateCylinder(
    "sphere",
    { diameter: i * 0.2, height: 3, segments: 32 },
    scene
  );

  sphere.position.x = i - 2;

  if (i === 2) {
    var blueMat = new StandardMaterial("blueMat", scene);
    blueMat.diffuseColor = new Color3(0.5, 0.5, 0.6);
    sphere.material = blueMat;
  }
}

//světlo
const light1 = new DirectionalLight(
  "DirectionalLight",
  new Vector3(-1, -1, -1),
  scene
);

//před vykreslením se vždy provede
scene.registerBeforeRender(function () {
  //sphere.position.x += 0.03;
  light1.setDirectionToTarget(sphere.position);
});

// povinné vykreslování
engine.runRenderLoop(function () {
  scene.render();
});
