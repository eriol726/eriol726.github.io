var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

var ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );


//scene.add(keyLight);
//scene.add(fillLight);
//scene.add(backLight);

var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
// invert the geometry on the x-axis so that all of the faces point inward
geometry.scale( - 1, 1, 1 );

var panorama = new THREE.TextureLoader()
panorama.load( 
    'assets/5Q1A1755_8_Panorama.jpg',
    // onLoad callback
	function ( texture ) {
		// in this example we create the material when the texture is loaded
		var material = new THREE.MeshBasicMaterial( {
			map: texture
        } );
         
        mesh = new THREE.Mesh( geometry, material );

        scene.add( mesh );

        var texture = new THREE.TextureLoader().load( 'assets/fabric_texture.jpg' );

		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setBaseUrl( '/assets/' );
		mtlLoader.setPath( '/assets/' );
		var url = "egg.mtl";
		mtlLoader.load( url, function( materials ) {

			materials.preload();

			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( '/assets/' );
			objLoader.load( 'egg.obj', function ( object ) {

				object.position.y = - 0;
				scene.add( object );

			}, function ( loading ) {
				console.log( 'Loading obj done ', );
			},  undefined );

		});

	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.error( 'An error happened.', err );
	} 
);

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();