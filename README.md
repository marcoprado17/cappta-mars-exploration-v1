# cappta-mars-exploration-v1

The source code of this project can be found on [https://github.com/marcoprado17/cappta-mars-exploration-v1](https://github.com/marcoprado17/cappta-mars-exploration-v1).

This project is my solution of cappta test ([https://gist.github.com/rmterra/31f2b4f589250839550f685d8873d935](https://gist.github.com/rmterra/31f2b4f589250839550f685d8873d935)).

The project solution is hosted on [mars-exploration.cappta.mprado.me](mars-exploration.cappta.mprado.me).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Additional Considerations

* If the input is invalid or have an invalid character, an error message will be showed.;
* If there is none probe, an error message will be showed;
* If a probe starts at an invalid position, an error message will be showed;
* If a probe starts in point with a previous probe occupying the same place, the last probe moves will be ignored;
* In the simulation, is cosidered that a probe appears in the field after all moves of the previous probe.

## Local Setup

```sh
yarn install
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deployement

```sh
yarn build
# TODO: Add more info
```
