const container = document.getElementById("pano-container");

var panorama1, panorama2, panorama3;

panorama1 = new PANOLENS.ImagePanorama("assets/360_3.jpeg");

panorama2 = new PANOLENS.ImagePanorama("assets/360.jpg");

panorama3 = new PANOLENS.ImagePanorama("assets/360_2.jpeg");

const viewer = new PANOLENS.Viewer({ container });
viewer.add(panorama1);
viewer.add(panorama2);
viewer.add(panorama3);

function handlePanoramaClick(event) {
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  const rect = viewer.renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, viewer.camera);

  const intersects = raycaster.intersectObject(panorama1, true);

  if (intersects.length > 0) {
    const position = intersects[0].point;

    console.log("Depth:", position.z);
    console.log("Height:", position.y);
    console.log("Width:", position.x);
  }
}

viewer.renderer.domElement.addEventListener("click", handlePanoramaClick);

panorama1.link(panorama2, new THREE.Vector3(-1531, -448, -5000), 300);
panorama2.link(panorama1, new THREE.Vector3(-3429.01, 1205.85, -3421.88));

panorama1.link(panorama3, new THREE.Vector3(-1106.42, -4277.19, -5000.0));
panorama3.link(panorama2, new THREE.Vector3(2092.2, -159.02, -4530.91));
