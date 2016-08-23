# Blocks360

Tetris-like game prototype for Samsung Gear S2. Entry of "Dispositivos por apps 2016" challenge.

## Requirements

Given that the application is designed to run in a Samsung Gear S2, you will need to install the [Tizen SDK](https://developer.tizen.org/development/tools/download) in order to deploy it in an emulator or in the physical smartwatch. However, the application itself can be executed in a modern web navigator, as it just depends on [Phaser](http://phaser.io/) framework.

## Build & Installation

We will use Tizen SDK CLI to build and install the game. With the command line, go to the directory where you cloned the project and execute these few instructions:

    > tizen package -t wgt -s <security profile name>
    > tizen install -t emulator-26101 -n Tetris360.wgt

Certificate and security profile are needed to execute successfully the above commands. Both can be generated via Tizen SDK CLI. To get more information about Tizen SDK CLI, refer to this [web](https://developer.tizen.org/development/tools/native-tools/command-line-interface).

The emulator should be running, of course.

## Usage

Run the application via emulator or via command line:

    > tizen run -t emulator-26101 -p 0gOGlkq5xv

You can run the application on any modern web browser serving the index file with any http server you like. I use [http-server module](https://www.npmjs.com/package/http-server), for example. This method allows a faster debugging.

## License

The music is owned by [Eric Matyas](http://soundimage.org/).

The content of this project itself is licensed under the [Creative Commons Attribution 4.0 license](https://creativecommons.org/licenses/by/4.0/), and the underlying source code used to format and display that content is licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).
